const server = "http://localhost:5000";


const api = {
    async get(endpoint, token){
        try{
            const response = await fetch(server + "/" + endpoint, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    
                },
            });
            return response;

        }
        catch(error){
            console.error('Error caused from GET Request: ' + error)
        }
    },

    async post(endpoint, data, token){
        try{
            const response = await fetch(server + "/" + endpoint, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': token,
                },
                body: JSON.stringify(data),
                
            })
            return response;

        }
        catch(error){
            console.error('Error caused from POST Request:' + error)
        }
    }

    
}

export default api;
