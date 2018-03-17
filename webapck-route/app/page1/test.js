const myObj = {
    name: 'John Doe',
    age: 35,
    sex: 'M',
    dob: new Date(1990, 1, 1)
  };

  const { name: Username, ...rest } = myObj
  console.log(Username);
  console.log(rest);