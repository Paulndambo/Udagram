import express, { Router, Request, Response } from 'express';
import bodyParser from 'body-parser';
import {deleteLocalFiles, filterImageFromURL} from './util/util'
const path = require("path");

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());


app.get("/filteredimage", async (req: Request, res: Response) => {
    const { image_url } = req.query;
    try {
      const imagePath = await filterImageFromURL(image_url);
      console.log(imagePath);
      res.status(200).sendFile(imagePath, (err) => {
        if (err) {
          res.status(500).send(err);
          return;
        }
        deleteLocalFiles([imagePath]);
      });
    } catch (err) {
      res.status(422).send("An error occurred");
      return;
    }
  })
  /**************************************************************************** */

  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();