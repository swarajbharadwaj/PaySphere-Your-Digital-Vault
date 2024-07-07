import { Appbar, Balance, Users } from "../components/Appbar";

function Dashboard(){
    return (
        <div>
            <Appbar/>
            <Balance balance={"10,000"}/>
            <Users/>
            
        </div>
    )
}

export default Dashboard;