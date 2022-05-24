const encode_file_into_base64 = async (file) => 
{
    return new Promise((resolve) => 
    {
        const fr = new FileReader();
        let base64_string;
        fr.onloadend = () => 
        {
            base64_string = fr.result;
            resolve(fr.result);
        };
        fr.readAsDataURL(file);
        return base64_string;
    });
};

export 
{
    encode_file_into_base64
};

