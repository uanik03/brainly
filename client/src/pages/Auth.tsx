import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { login, signUp } from "@/services/authService";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userInfoState } from "@/recoil/authAtoms";

const signUpFormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({ message: "Please provide valid email" }),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      {
        message:
          "Password should be between 8 and 20 characters and contain atleast 1 uppercase, 1 lowercase, 1 special character and 1 number",
      }
    ),
});

const loginFormSchema = z.object({
  email: z.string().email({ message: "Please provide valid email" }),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      {
        message:
          "Password should be between 8 and 20 characters and contain atleast 1 uppercase, 1 lowercase, 1 special character and 1 number",
      }
    ),
});

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const setUser = useSetRecoilState(userInfoState);

  const navigate = useNavigate();

  const signUpForm = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleSignUp(data: z.infer<typeof signUpFormSchema>) {
    try {
      const resData = await signUp(data);

      localStorage.setItem("token", resData.token);
      localStorage.setItem("user", JSON.stringify(resData.user));
      setUser(resData.user);
      alert(resData.msg);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  }

  async function handleLogin(data: z.infer<typeof loginFormSchema>) {
    try {
      const resData = await login(data);
      localStorage.setItem("token", resData.token);
      localStorage.setItem("user", JSON.stringify(resData.user));
      setUser(resData.user);
      alert(resData.msg);
      navigate("/home");
    } catch (error) {}
  }

  return (
    <div className="h-screen ">
      <div className="flex items-center w-full  h-full flex-col">
        <div className="flex-1 flex items-center justify-center w-full ">
          {isLogin ? (
            <Form {...loginForm} key="login-form">
              <form
                onSubmit={loginForm.handleSubmit(handleLogin)}
                className="space-y-8 flex flex-col w-1/4 gap-3 p-3 border-2 border-gray-400 items-center rounded-lg shadow-md"
              >
                <h3 className="text-3xl font-medium">Second-Brain</h3>

                <div className="text-2xl font-normal">Login</div>

                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="email" {...field} type="email" />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel>Password</FormLabel> */}
                      <FormControl>
                        <Input
                          placeholder="password"
                          {...field}
                          type="password"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button className="w-1/3">login</Button>

                <div>
                  Don't have an account?{" "}
                  <span
                    className="text-gray-700 cursor-pointer hover:text-black"
                    onClick={() => setIsLogin(false)}
                  >
                    sign up
                  </span>
                </div>
              </form>
            </Form>
          ) : (
            <Form {...signUpForm} key="signup-form">
              <form
                onSubmit={signUpForm.handleSubmit(handleSignUp)}
                className="space-y-8 flex flex-col w-1/4 gap-3 p-3 border-2 border-gray-400 items-center"
              >
                <h3 className="text-3xl font-medium">Second-Brain</h3>

                <div className="text-2xl font-normal">Sign Up</div>

                <FormField
                  control={signUpForm.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="name" {...field} type="text" />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={signUpForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="email" {...field} type="email" />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={signUpForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="password"
                          {...field}
                          type="password"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button className="w-1/3">sign up</Button>

                <div>
                  Already have an account?{" "}
                  <span
                    className="text-gray-700 cursor-pointer hover:text-black"
                    onClick={() => setIsLogin(true)}
                  >
                    login
                  </span>
                </div>
              </form>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
