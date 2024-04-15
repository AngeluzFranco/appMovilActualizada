import { useState } from "react";

export const Backend = () => {
    const [url, setUrl] = useState("http://GastroManagerzzz-env.eba-pe7hcsjz.us-east-1.elasticbeanstalk.com/api/gastromanager");

    return { url };
}