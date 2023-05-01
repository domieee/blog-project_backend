import { Outlet } from "react-router-dom";
import './RegisterProgress.scss'

const RegisterProgress = () => {
    return (
        <section className="registerProgress">
            <progress value={0.1} />
            <Outlet />
        </section>
    );
}

export default RegisterProgress;