import mongoose from "mongoose";
import clientDb from "../model/client.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import transactionDb from "../model/Transaction.js";

const signup = async (req, res) => {
  console.log(req.body);
  try {
    const { name, password, email } = req.body.formValues;
    const user = await clientDb.findOne({ email: email });

    if (user) {
      res.json({ status: false, message: "email already exist" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password.trim(), salt);

      await clientDb
        .create({
          name,
          email,

          password: hashPassword,
        })
        .then((data) => {
          res.json({ status: true, message: "email already exist" });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  } catch (error) {
    console.log(error);
  }
  const user = await clientDb.find();
  console.log(user);
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body.formValues;

    const user = await clientDb.findOne({ email: email });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (user.email === email && isMatch) {
        const ID = user._id;
        const token = jwt.sign({ ID }, process.env.JWT_SECRET_KEY, {
          expiresIn: 3000,
        });

        res.json({
          status: true,
          message: "login success",
          token: token,
        });
      } else {
        res.json({ status: false, message: "User password is incorrect" });
      }
    } else {
      res.json({ status: false, message: "User email is incorrect" });
    }
  } catch (error) {
    console.log(error);
  }
};

const deposit = async (req, res) => {

  try {
    const { amount } = req.body;
  const ID = req.userId;

  await clientDb
  .updateOne({ _id: ID }, { $inc: { balance: amount } })
    .then(async () => {
      const result = await clientDb.findOne({ _id: ID });
      await transactionDb
      .create({
        owner: ID,
        amount: amount,
        type: "credit",
        details: "deposit",
        balance: result.balance,
      })
        .then(() => {
          res.json({ status: true });
        });
    }); 
  } catch (error) {
    console.log(error);
  }
 
};

const withdraw = async (req, res) => {

try {
  const { amount } = req.body;

  const ID = req.userId;

  const user = await clientDb.findById(ID);

  if (user.balance === 0 || user.balance < amount) {
    res.json({ status: false, message: "Insufficient Balance" });
  } else {
    await clientDb
    .updateOne({ _id: ID }, { $inc: { balance: -amount } })
      .then(async () => {
        const result = await clientDb.findOne({ _id: ID });
        await transactionDb
        .create({
          owner: ID,
          amount: amount,
          type: "debit",
          details: "withdraw",
          balance: result.balance,
        })
          .then(() => {
            res.json({ status: true });
          });
      });
  }
} catch (error) {
  console.log(error);
}


 
};

const transfer = async (req, res) => {


try {
  const { amount, email } = req.body;
  const ID = req.userId;
;

  const sender = await clientDb.findById(ID);
  const reciever = await clientDb.findOne({ email: email });

  if (sender) {
    if (sender.balance === 0 || sender.balance < amount) {
      res.json({ status: false, message: "Insufficient Balance" });
    } else {
      await clientDb
        .updateOne({ _id: ID }, { $inc: { balance: -amount } })
       
        .then(async (data) => {

          const result = await clientDb.findOne({ _id: ID });

          await transactionDb.create({
            owner: ID,
            amount: amount,
            type: "debit",
            details: `transfer to ${email}`,
            balance: result.balance,
          });

          await clientDb
            .updateOne({ email: email }, { $inc: { balance: amount } })
           
            .then(async () => {

              const data = await clientDb.findOne({email:email });

              await transactionDb.create({
                owner: reciever._id,
                amount: amount,
                type: "credit",
                details: `transfer from ${sender.email}`,
                balance: data.balance,
              }).then((data)=>{
                res.json({status:true})
              })
            });
        });
    }
  } else {
    res.json({ status: false, message: "Incorrect email" });
  }
} catch (error) {
  console.log(error);
}


};

const trasactions=async(req,res)=>{

try {
  
  const ID = req.userId;
   await transactionDb.find({owner:ID}).then((data)=>{

    console.log(data,232323);
    res.json({result:data})
   })
} catch (error) {
 console.log(error); 
}


}


const profile=async(req,res)=>{

  try {
    
    const ID = req.userId;
  
    const result=await clientDb.findOne({_id:ID})
  
    res.json({status:true,result:result})
  } catch (error) {
    console.log(error);
  }
}

export { signup, login, deposit, withdraw, transfer,trasactions,profile };
