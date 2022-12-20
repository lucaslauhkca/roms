export default function AuthHeader()
{
    const staffString = localStorage.getItem("staff");
    let staff = null;

    if(staffString)
    {
        staff = JSON.parse(staffString);
    }

    if(staff && staff.token)
    {
        return { headers: {"Authorization": "Bearer " + staff.token }};
    }
    else
    {
        return {};
    }
}