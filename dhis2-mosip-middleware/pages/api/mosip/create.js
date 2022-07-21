
export default async function authenticate(req, res) 
{
  try
  {
    if (req.method === 'POST') 
    {
        return res.status(400).json({message: "We can create an authentication mean"});
    }
  }
  catch(err)
  {
    return res.status(400).json(err);
  }
  
}
  