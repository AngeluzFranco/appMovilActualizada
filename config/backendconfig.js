import { useState } from "react";

export const Backend = () => {
    const [url, setUrl] = useState("http://192.168.133.86:8080/api/gastromanager");

    return { url };
}