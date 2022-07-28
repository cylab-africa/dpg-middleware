import { cipheringText, decipheringText } from "../../../utils/aes.encrypt";
import { API_ROUTE } from "../../../utils/mosip.env";
import { validateEncryptKeys } from "../../../utils/validations";

export default async function authenticate(req, res) 
{
  try
  {
    if (req.method === 'POST')
    {
      const validationRes = validateEncryptKeys(req.body);
      if(!validationRes.success)
      {
        return res.status(400).json({
          success: false,
          message: validationRes.message
        });
      }
      else
      {
        const content = {
          misp_lk: "jnishimi",
          auth_partner_id: "cmumisp",
          api_key: "940594",
          transaction_id: "transaction-id",
          callback_url: "localhost:3010/users/auth-",
          timestamp: Date.now(),
        }
        const encrypted = cipheringText(JSON.stringify(content));

        const url = `${process.env.API_ROUTE}?token=${encrypted}`

        return res.status(200).json({success: true, url})
      }
    }
  }
  catch(err)
  {
    return res.status(400).json(err);
  }
  
}
  