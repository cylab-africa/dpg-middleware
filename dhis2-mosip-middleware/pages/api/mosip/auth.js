export default function handler(req, res) {
  if (req.method === 'POST') 
  {
    console.log(req.body);
    res.status(200).json({ name: 'John Doe', method: "POST" })
  } 
  else 
  {
    // Handle any other HTTP method
    console.log(req.body);
    res.status(200).json({ name: 'Jean Paul', method: "GET" })
  }
}
  