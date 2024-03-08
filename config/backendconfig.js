import { useState } from "react";

export const Backend = () => {
    const [url, setUrl] = useState("http://192.168.107.133:8080/api/gastromanager");

    return { url };
}