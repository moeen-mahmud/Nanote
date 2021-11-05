import { useEffect, useState } from "react";

const useGreetings = () => {
  const [greet, setGreet] = useState(0);
  const [greetMessage, setGreetMessage] = useState("");
  setGreet(new Date().getHours());

  useEffect(() => {
    if (greet < 12) {
      setGreetMessage("Good Morning");
    } else if (greet >= 12 && greet <= 17) {
      setGreetMessage("Good Afternoon");
    } else if (greet > 17 && greet <= 24) {
      setGreetMessage("Good Evening");
    }
  }, [greet]);

  return greetMessage;
};

export default useGreetings;
