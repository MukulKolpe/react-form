import "./App.css";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

function App() {
  const schema = z
    .object({
      fname: z.string().min(2).max(20),
      lname: z.string().min(2).max(20),
      email: z.string().email(),
      age: z.number().min(18).max(70),
      password: z.string().min(6).max(20),
      cpassword: z.string().min(6).max(20),
    })
    .refine((data) => data.email.includes("ves.ac.in"), {
      message: "Only VESIT Email Allowed",
      path: ["email"],
    });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const submitData = (data) => {
    console.log("This Works", data);
  };
  return (
    <div className="App">
      <form onSubmit={handleSubmit(submitData)}>
        <label htmlFor="fname">First Name:</label>
        <input type="text" name="fname" id="fname" {...register("fname")} />
        {errors.fname && <span>{errors.fname.message}</span>}
        <label htmlFor="lname">Last Name:</label>
        <input type="text" name="lname" id="lname" {...register("lname")} />
        {errors.lname && <span>{errors.lname.message}</span>}
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" id="email" {...register("email")} />
        {errors.email && <span>{errors.email.message}</span>}
        <label htmlFor="age">Age:</label>
        <input
          type="number"
          name="age"
          id="age"
          {...register("age", { valueAsNumber: true })}
        />
        {errors.age && <span>{errors.age.message}</span>}
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          {...register("password")}
        />
        {errors.password && <span>{errors.password.message}</span>}
        <label htmlFor="cpassword">Confirm Password:</label>
        <input
          type="password"
          name="cpassword"
          id="cpassword"
          {...register("cpassword")}
        />
        {errors.cpassword && <span>{errors.cpassword.message}</span>}
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default App;
