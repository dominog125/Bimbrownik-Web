import { useNavigate } from "react-router-dom";

function LogoutLink(props: { children: React.ReactNode }) {
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        // Remove JWT token from localStorage
        localStorage.removeItem('jwtToken');
        // Optionally clear other user data here

        // Force a full page reload to refresh navbar state
        window.location.href = "/login";
    };

    return (
        <>
            <a href="#" onClick={handleSubmit}>{props.children}</a>
        </>
    );
}

export default LogoutLink;