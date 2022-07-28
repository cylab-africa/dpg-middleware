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
          misp_lk: req.body.misp_lk,
          auth_partner_id: req.body.auth_partner_id,
          api_key: req.body.api_key,
          transaction_id: req.body.transaction_id,
          callback_url: req.body.callback_url,
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
  