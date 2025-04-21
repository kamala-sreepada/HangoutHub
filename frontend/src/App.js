import React, {useEffect, useState} from 'react';
import {Routes, Route, Link, useNavigate} from 'react-router-dom';
import logo from './homepage_illustration1.png';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { enUS } from 'date-fns/locale';

function Home() {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((error) => setMessage('Error: Could not connect to Flask backend'));
      })
  return (
    // TODO: Add logo
    <div className="font-lato bg-gradient-to-t from-gray-200 to-white min-h-screen">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-3 bg-white shadow-sm">
        {/* Left side of the navbar */}
        <div className="flex text-xl font-bold items-center space-x-2">
          <span>
            <img src="" class="w-1/3 mx-auto mt-10 float-left"/>
          </span>
          <span>
            <h1 class="font-bold"> <a href="/">🫂 HangoutHub</a></h1>
          </span>
        </div>

        {/* Right side of the navbar */} 
        <div>
          <button className="px-4 py-2" onClick={() => navigate('/login')}>Login</button>
          <button className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800" onClick={() => navigate('/signup')}>Sign Up</button>
        </div>
      </nav>

      {/* Main section */}
      <div class="mt-20 mb-4 mx-12 flex flex-col md:flex-row items-center justify-between gap-10">
        <div class="flex flex-col max-w-xl">
          <h1 class="text-5xl font-extrabold leading-tight text-gray-900">
            Plan Perfect Group <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Hangouts</span> Together
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Coordinate activities, vote on locations, and find the perfect time for everyone to meet up – all in one place.
          </p>
          <div className="mt-7">
            <button onClick={() => navigate('/session/create')} className="px-6 py-2.5 rounded-lg bg-black text-white hover:bg-gray-800">
              Create a Hangout
            </button>
            <button onClick={() => navigate('/session/join')} className="ml-4 px-9 py-2.5 rounded-lg bg-white border border-gray-200 hover:bg-gray-100">
              Join a Hangout
            </button>
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <img src={logo} alt="Illustration" className="w-full mx-auto" />
        </div>
      </div>


      {/* How it Works */}
      <div class="bg-white shadow-sm p-4 mb-10 pb-10">
        <div class="mt-5">
          <h2 className="text-5xl font-extrabold text-center">How it Works</h2>
        </div>
        <div class="px-40 mt-10 flex items-center items-stretch gap-x-6">
          <p class="mt-2 border w-1/2 px-4 flex-grow py-6 rounded-lg border-gray-200 text-center">
            <div class="items-center justify-center flex mx-auto w-10 h-10 rounded-full items-center bg-black text-white p-2">1</div>
            <p class="font-extrabold pb-2 mt-2">Create a Hangout</p>
            Start a new hangout with a name and short description</p>
          <p class="mt-2 border w-1/2 px-4 flex-grow py-6 rounded-lg border-gray-200 text-center">
          <div class="items-center justify-center flex mx-auto w-10 h-10 rounded-full items-center bg-black text-white p-2">2</div>
            <p class="font-extrabold pb-2 mt-2">Invite Friends</p>
            Share your unique invite link or code so friends can join your group</p>
          <p class="mt-2 border w-1/2 px-4 flex-grow py-6 rounded-lg border-gray-200 text-center">
          <div class="items-center justify-center flex mx-auto w-10 h-10 rounded-full items-center bg-black text-white p-2">3</div>
            <p class="font-extrabold pb-2 mt-2">Plan Together</p>
            Collaborate to suggest activities, vote on ideas, and create your itinerary</p>
          <p class="mt-2 border w-1/2 px-4 flex-grow py-6 rounded-lg border-gray-200 text-center">
          <div class="items-center justify-center flex mx-auto w-10 h-10 rounded-full items-center bg-black text-white p-2">4</div>
            <p class="font-extrabold pb-2 mt-2">Enjoy Your Hangout</p>
            Have fun and make great memories with your friends!</p>
        </div>      
      </div>
    </div>
  )
}

function CreateSession(){
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  const backHome = "< Back to Home";

  return(
    <div class="font-lato items-center px-96 pt-6 py-3 bg-gradient-to-t from-gray-200 to-white min-h-screen">
      
      <a href="/" class="flex items-center">
        <h1 class="text-gray-500 hover:text-black">{backHome}</h1>
      </a>
      <div class="mt-2 border-2 border-gray-300 shadow-lg rounded-lg p-6 pb-3 bg-white">
        <h1 class="font-bold text-2xl">Create a New Hangout</h1>
        <h2 class="text-gray-600">Enter some basic details for your group hangout</h2>
        <form class="mt-4" id="create_hangout_form">
          <div>
            <label for="hangout_name">Hangout Name <font color="red">*</font></label><br/>
            <input type="text" id="hangout_name" name="hangout_name" class="border p-2 m-1 rounded w-full" placeholder="Picnic Hangout" required/>
          </div>
          <div class="mt-2">
            <label for="hangout_description">Description (Optional)</label><br/>
            <input type="text" id="hangout_description" name="hangout_description" class="border p-2 m-1 rounded w-full pb-14" placeholder="Let's plan something fun for the weekend!"/>
          </div>
          <div class="mt-2">
            <label for="date_range">Possible Date Range <font color="red">*</font></label><br/>
            <DateRange
              editableDateInputs={true}
              onChange={item => setRange([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={range}
              locale={enUS}
              required
            />
          </div>
          <div>
            <button type="submit" class="-m-10 mx-5 float-right px-6 py-2.5 rounded-lg bg-black text-white hover:bg-gray-800">Create Hangout</button>
          </div>
          </form>
      </div>
    </div>
  )
}

function JoinSession(){
  const backHome = "< Back to Home";

  return(
    <div class="font-lato items-center px-96 pt-10 bg-gradient-to-t from-gray-200 to-white min-h-screen">
      
      <a href="/" class="flex items-center">
        <h1 class="mx-20 mtext-gray-500 hover:text-black">{backHome}</h1>
      </a>
      <div class="mx-20 mt-2 border-2 border-gray-300 shadow-lg rounded-lg p-6 pb-14">
        <h1 class="font-bold text-2xl">Join a Hangout</h1>
        <h2 class="text-gray-600">Enter the hangout code or use the invite link you received</h2>
        <form class="mt-4" id="create_hangout_form">
          <div>
            <label for="hangout_code">Hangout Code <font color="red">*</font></label><br/>
            <input type="text" id="hangout_code" name="hangout_code" class="border p-2 m-1 rounded w-full" placeholder="Enter code (ex: ABC123)" required/>
          </div>
          <div class="mt-2">
            <label for="your_name">Your Name <font color="red">*</font></label><br/>
            <input type="text" id="your_name" name="your_name" class="border p-2 m-1 rounded w-full pb-14" placeholder="Enter your name" required/>
          </div>    
          <div class="mt-2">
            <label for="your_email">Email Address <font color="red">*</font></label><br/>
            <input type="text" id="your_email" name="your_email" class="border p-2 m-1 rounded w-full pb-14" placeholder="Enter your email" required/>
          </div>  
          <div>
            <h2 class="text-sm text-gray-600">We'll use this to send you calender invites</h2>
          </div>
          <div>
            <button type="submit" class="mx-5 float-right px-6 py-2.5 rounded-lg bg-black text-white hover:bg-gray-800">Join Hangout</button>
          </div>
          </form>
      </div>
    </div>
  )
}

function Login(){
  const backHome = "< Back to Home";

  return(
    <div class="font-lato items-center px-[30rem] pt-10 bg-gradient-to-t from-gray-200 to-white min-h-screen">
      <div class="my-32">
        <a href="/" class="flex items-center">
          <h1 class="text-gray-500 hover:text-black">{backHome}</h1>
        </a>
        <div class="shadow-lg mt-3 border-2 border-gray-300 rounded-lg p-6 pb-14 bg-white">
          <h1 class="font-bold text-2xl text-center">Welcome Back!</h1>
          <h2 class="text-gray-600 text-center">Login to your account</h2>
          <form class="mt-4" id="login_form">
            <div>
              <label for="username">Username <font color="red">*</font></label><br/>
              <input type="text" id="username" name="username" class="border p-2 m-1 rounded w-full" placeholder="Enter username" required/>
            </div>
            <div class="mt-2">
              <label for="password">Password <font color="red">*</font></label><br/>
              <input type="text" id="password" name="password" class="border p-2 m-1 rounded w-full" placeholder="Enter password" required/>
            </div>    
            <div>
              <button type="submit" class="mx-5 mt-1 float-right px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-800">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

function SignUp(){
  const backHome = "< Back to Home";

  return(
    <div class="font-lato items-center px-[30rem] pt-10 bg-gradient-to-t from-gray-200 to-white min-h-screen">
      <div class="my-32">
        <a href="/" class="flex items-center">
          <h1 class="text-gray-500 hover:text-black">{backHome}</h1>
        </a>
        <div class="shadow-lg mt-3 border-2 border-gray-300 rounded-lg p-6 pb-14 bg-white">
          <h1 class="font-bold text-2xl text-center">Create an account</h1>
          <h2 class="text-gray-600 text-center">Already have an account? <a href="/login" class="underline">Login</a></h2>
          <form class="mt-4" id="login_form">
            <div>
              <label for="username">Username <font color="red">*</font></label><br/>
              <input type="text" id="username" name="username" class="border p-2 m-1 rounded w-full" placeholder="Enter username" required/>
            </div>
            <div class="mt-2">
              <label for="email">Email Address <font color="red">*</font></label><br/>
              <input type="text" id="email" name="email" class="border p-2 m-1 rounded w-full" placeholder="Enter email id" required/>
            </div>
            <div class="mt-2">
              <label for="password">Password <font color="red">*</font></label><br/>
              <input type="text" id="password" name="password" class="border p-2 m-1 rounded w-full" placeholder="Enter password" required/>
            </div>    
            <div>
              <button type="submit" class="mx-5 mt-1 float-right px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-800">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

function App(){
  return(
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/session/create" element={<CreateSession />} />
    <Route path="/session/join" element={<JoinSession />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />
  </Routes>)
}

export default App;
