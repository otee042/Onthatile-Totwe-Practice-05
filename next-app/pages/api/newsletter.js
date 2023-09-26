import { connectDatabase , insertDocument } from '../../helpers/db-util';


export async function handler(req , res) {
    if( req.method === 'POST') {
        const userEmail = req.body.email;

        if(!userEmail || !userEmail.includes('@')) {
            res.status(422).json( { message: 'Invalid email address.' });
            return;
        }

        let client;

        try {
            client = await connectDatabase();     //to connect to the client
        } catch ( error )  {
            res.status(500).json({ message: 'Connecting to database failed!'});
            return;
        }

        try {
            await insertDocument(client , 'newsletter' , { email: userEmail });
            client.close();
        } catch ( error )  {
            res.status(500).json({ message: 'Inserting data failed!'});
            return;
        }
        
        res.status(201).json({ message: 'Signed Up!'});
    }
}
