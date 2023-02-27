export const getDataFromResponse = (response) =>
{
    while(response.data)
    {
        response = response.data;
    }
    return response;
}