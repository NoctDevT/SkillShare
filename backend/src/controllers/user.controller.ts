import { Request, Response } from 'express';
import { logger } from '../util/loggerUtils';
import { z } from 'zod';
import { UserService } from '@src/services/user.service';
import Auth0User from "../models/auth.user";

export const onboarding = async (req: Request, res: Response): Promise<void> => {

  //Using auth email to prevent forgeary attack 
  // Will later on extract provider and provider id from oidc user
  const { email } = req.oidc.user as Auth0User;
   
    try {
      if (!email) {
        res.status(401).json({ success: false, message: "Unauthorised: No authenticated email found" });
        throw new Error ("Email not specified")
      }

      const user = await UserService.handleOnboarding(req.body, email);

      if(!user) res.status(400).json({success: false, message: "User not found"})

      logger.info("User onboarded successfully:", user);
      res.status(200).json({ success: true, user });
    } catch (error) {
      if (error instanceof z.ZodError) {
        logger.error("Validation error occurred during onboarding:", req.body);
        res.status(400).json({ error: "Validation failed", details: error.flatten() });
      } else {
        logger.error(" Error has occurred during onboarding: ", error);
        res.status(500).json({ error: "Internal server error" });
      }
    }
};

export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
    try{
        const { email } = req.oidc.user as Auth0User;
        if(!email) {
            res.status(500).json({error: "Internal server error"});
            logger.error("Route accessed by AUTH0 user with no email provided");
            throw new Error("Application error with authentication")
        }
        let user = await UserService.getUser(email);

        res.status(200).send(user);
        
    }catch(error){
        logger.error("Error getting profile");
        res.status(500).json({error: "Internal server error"})
        throw new Error(`Application Error : ${error} `)

    }
}
