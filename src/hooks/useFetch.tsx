import { useEffect, useState } from "react"
import { AxiosResponse } from "axios"

export default function useFetch<Data, Params> (
    request: (params: Params) => Promise<AxiosResponse<Data>>,
    params: Params,
    dependencies: any[]
){

    const [data,setData] = useState<Data | null>(null)
    const [error,setError] = useState<Error | null>(null)
    const [loading,setLoading] = useState(false)

    useEffect(() => {
        (
            async function(){
                try {
                    setLoading(true)
                    const response = await request(params);
                    setData(response.data);
                } catch(err) {
                    setError(err as Error)
                } finally {
                    setLoading(false)
                }
            }
        )()
    }, [request, params, ...dependencies])

    return { data, error, loading }

}