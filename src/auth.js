import React, { Fragment } from "react";
import { useState } from "react";
import { H1, Form, Div, Div1, Error, Inputdiv1, Button, Input } from "./styles";

const Auth = (props) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [CheckoutText, setCheckoutText] = useState(null);

  const buttonhandler = (event) => {
    event.preventDefault();
    alert("You are succesfully Logged In");
    // window.dataLayer.push({
    //   user_id: email,
    // });
  };

  return (
    <div>
      <Form>
        <Div>
          <Inputdiv1>
            <Input
              required
              type="email"
              placeholder="Email Id"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              focus={props.error}
              error={props.error}
              touched={props.error}
            />
          </Inputdiv1>
          <Inputdiv1>
            <Input
              required
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              focus={props.error}
              error={props.error}
              touched={props.error}
            />
          </Inputdiv1>
        </Div>
        <Div1>
          <Button
            className="submitbtn"
            type="submit"
            onClick={(event) => buttonhandler(event)}
          >
            SignIn
          </Button>
        </Div1>
      </Form>
    </div>
  );
};

export default Auth;
