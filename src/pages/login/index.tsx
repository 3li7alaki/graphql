import {useState} from "react";
import {useRouter} from "next/router";
import {getUserData} from "@/utils/graphql";
import dynamic from "next/dynamic";
import {useUser} from "@/contexts/UserContext";
import {setCookie} from "cookies-next";
import axios from "axios";

const GlobalInit = dynamic(() => import('../../components/GlobalInit'), { ssr: false });

export default function Login() {
    const { dispatch } = useUser();
    const [credentials, setCredentials] = useState({ identifier: '', password: '' });
    const [error, setError] = useState('');
    const router = useRouter();

    const handleInputChange = (e) => {
        setError('');
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        const basicAuth = btoa(`${credentials.identifier}:${credentials.password}`);

        await axios.post('https://learn.reboot01.com/api/auth/signin', null, {
            headers: {
                Authorization: `Basic ${basicAuth}`,
            },
        }).then(async (response) => {
            const token = response.data;
            await getUserData(token).then((data) => {
                data.token = token;
                dispatch({type: 'SET_USER', payload: data});
                setCookie('token', token);
            });

            await router.push('/');
        }).catch(() => {
            setError('Invalid credentials. Please try again.');
            return;
        });
    };

    return (
        <div className="flex items-center justify-center h-full">
            <div className="card max-w-md mx-auto shadow-lg p-6 rounded-lg">
                <div className="card-body">
                    <form className="form flex flex-col gap-4 items-center justify-center">
                          <span className="form-hint text-danger">
                              {error}
                          </span>
                        {/* Username/Email Field */}
                        <div className="form-group w-full">
                            <label className={"input w-full flex justify-between " + (error !== '' ? "border-danger" : '')}>
                                <input
                                    placeholder="Username/Email"
                                    name="identifier"
                                    type="text"
                                    onChange={handleInputChange}
                                />
                                <span className="leading-none ml-2 cursor-pointer" data-tooltip="#my_tooltip">
                  <i className="ki-outline ki-information-4"></i>
                </span>
                            </label>
                            <div className="tooltip text-primary text-gray-500 bg-light dark:bg-dark" id="my_tooltip">
                                You can login with username or email
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="form-group w-full">
                            <div
                                className={"input " + (error !== '' ? "border-danger" : '')}
                                data-toggle-password="true"
                                data-toggle-password-permanent="true"
                            >
                                <input
                                    className="w-full"
                                    placeholder="Password"
                                    name="password"
                                    type="password"
                                    onChange={handleInputChange}
                                />
                                <div
                                    className="btn btn-icon ml-2 cursor-pointer"
                                    data-toggle-password-trigger="true"
                                >
                                    <i className="ki-outline ki-eye toggle-password-active:hidden"></i>
                                    <i className="ki-outline ki-eye-slash hidden toggle-password-active:block"></i>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            className="btn btn-primary w-full p-2 rounded-lg bg-blue-500 text-white justify-center"
                            onClick={handleLogin}
                        >
                            Log in
                        </button>
                    </form>
                </div>
            </div>
            <GlobalInit />
        </div>
    );
}
