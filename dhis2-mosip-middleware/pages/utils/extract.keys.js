export const extract = (keys_decrypt) =>
{
    const arr = keys_decrypt.split("|");
    return {misp_lk: arr[0], auth_partner_id: arr[1], api_key: arr[2], transaction_id: arr[3], callback_url: arr[4]}
}