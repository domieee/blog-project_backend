import { Outlet } from "react-router-dom";
import './RegisterProgress.scss'

const RegisterProgress = () => {
    return (
        <section className="registerProgress">
            <div className="progress"></div>
            <Outlet />
        </section>
    );
}

export default RegisterProgress;