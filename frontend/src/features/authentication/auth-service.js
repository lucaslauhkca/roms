import http from '../../utils/customFetch';

class AuthService
{
    login(username, password)
    {
        return http.post('/auth/signin', {username, password})
            .then(response => {
                
            if(response.data.token)
            {
                localStorage.setItem("staff", JSON.stringify(response.data));
            }
            return response.data;
        })
    }
    
    logout()
    {
        localStorage.removeItem("staff");
    }
     
    register(username, password, firstname, lastname, role)
    {
        return http.post('/auth/signup', {username, password, firstname, lastname, role})
        .then(response => {
            return response.data;
        });
    }

    getCurrentUser()
    {
        const staffString = localStorage.getItem("staff");
        if(staffString)
        {
            return JSON.parse(staffString);
        }
        return false;
    }
}

export default new AuthService();