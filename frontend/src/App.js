import React, {useEffect, useState} from 'react';
import {Routes, Route, Link, useNavigate} from 'react-router-dom';
import logo from './homepage_illustration1.png';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { enUS } from 'date-fns/locale';
import {useParams} from 'react-router-dom';

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
      <h1>{message}</h1>
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

// ---------------------------------------------------------------------------------------------------------------------------------------------

function CreateSession(){
  const [hangoutName, setHangoutName] = useState('');
  const [description, setDescription] = useState('');
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  const backHome = "< Back to Home";
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const hangoutData = {
      name: hangoutName,
      description: description,
      startDate: range[0].startDate,
      endDate: range[0].endDate,
    };
    console.log('Form submitted:', hangoutData);

  // Later: You can POST hangoutData to backend here

    navigate('/hangout/{12345}'); // temporary dummy ID
  };

  return(
    <div class="font-lato items-center px-96 pt-6 py-3 bg-gradient-to-t from-gray-200 to-white min-h-screen">
      
      <a href="/" class="flex items-center">
        <h1 class="text-gray-500 hover:text-black">{backHome}</h1>
      </a>
      <div class="mt-2 border-2 border-gray-300 shadow-lg rounded-lg p-6 pb-3 bg-white">
        <h1 class="font-bold text-2xl">Create a New Hangout</h1>
        <h2 class="text-gray-600">Enter some basic details for your group hangout</h2>
        <form class="mt-4" id="create_hangout_form" onSubmit={handleSubmit}>
          <div>
            <label for="hangout_name">Hangout Name <font color="red">*</font></label><br/>
            <input type="text" id="hangout_name" name="hangout_name" value={hangoutName} onChange={(e) => setHangoutName(e.target.value)}
              class="border p-2 m-1 rounded w-full" placeholder="Picnic Hangout" required/>
          </div>
          <div class="mt-2">
            <label for="hangout_description">Description (Optional)</label><br/>
            <input type="text" id="hangout_description" name="hangout_description" value={description} onChange={(e) => setDescription(e.target.value)}
             class="border p-2 m-1 rounded w-full pb-14" placeholder="Let's plan something fun for the weekend!"/>
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

// ---------------------------------------------------------------------------------------------------------------------------------------------

function JoinSession(){
  const backHome = "< Back to Home";

  return(
    <div class="font-lato items-center px-96 pt-10 bg-gradient-to-t from-gray-200 to-white min-h-screen">
      
      <a href="/" class="flex items-center">
        <h1 class="mx-20 mtext-gray-500 hover:text-black">{backHome}</h1>
      </a>
      <div class="mx-20 mt-2 border-2 border-gray-300 bg-white shadow-lg rounded-lg p-6 pb-14">
        <h1 class="font-bold text-2xl">Join a Hangout</h1>
        <h2 class="text-gray-600">Enter the hangout code or use the invite link you received</h2>
        <form class="mt-4" id="create_hangout_form">
          <div>
            <label for="hangout_code">Hangout Code <font color="red">*</font></label><br/>
            <input type="text" id="hangout_code" name="hangout_code" class="border p-2 m-1 rounded w-full" placeholder="Enter code (ex: ABC123)" required/>
          </div>
          <div class="mt-2">
            <label for="your_name">Your Name <font color="red">*</font></label><br/>
            <input type="text" id="your_name" name="your_name" class="border p-2 m-1 rounded w-full" placeholder="Enter your name" required/>
          </div>    
          <div class="mt-2">
            <label for="your_email">Email Address <font color="red">*</font></label><br/>
            <input type="text" id="your_email" name="your_email" class="border p-2 m-1 rounded w-full" placeholder="Enter your email" required/>
          </div>  
          <div>
            <h2 class="text-sm text-gray-600">We'll use this to send you calender invites</h2>
          </div>
          <div>
            <button type="submit" class="mx-5 float-right px-6 py-2.5 rounded-lg bg-black text-white hover:bg-gray-800" >Join Hangout</button>
          </div>
          </form>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------------------------------------------------------------------------

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
          <h2 class="text-gray-600 text-center">Don't have an account? <a href="/signup" class="underline">Sign Up</a> </h2>
          <form class="mt-4" id="login_form">
            <div>
              <label for="username">Username <font color="red">*</font></label><br/>
              <input type="text" id="username" name="username" class="border p-2 m-1 rounded w-full" placeholder="Enter username" required/>
            </div>
            <div class="mt-2">
              <label for="password">Password <font color="red">*</font></label><br/>
              <input type="password" id="password" name="password" class="border p-2 m-1 rounded w-full" placeholder="Enter password" required/>
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

// ---------------------------------------------------------------------------------------------------------------------------------------------

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
              <input type="password" id="password" name="password" class="border p-2 m-1 rounded w-full" placeholder="Enter password" required/>
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
// ---------------------------------------------------------------------------------------------------------------------------------------------

function HangoutPage(){
  const { id } = useParams(); // Get the hangout ID from the URL
  const [hangout, setHangout] = useState(null);
  const [copied, setCopied] = useState(false);
  const backHome = "< Back to Home";

  const sharingLink = `https://hangouthub.vercel.app/join/${id}`;

  useEffect(() => {
    fetch(`http://localhost:5000/hangout/${id}`)
      .then((res) => res.json())
      .then((data) => setHangout(data))
      .catch((error) => console.error('Error fetching hangout data:', error));
  }, [id]); 
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(sharingLink);
      setCopied(true)
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };
  const [activeTab, setActiveTab] = useState();

  return(
    <div class="font-lato">
      {/* once we get backend in place */}
      {/* <h1 className="text-4xl font-bold">{hangout.name}</h1> */}
      {/* <p className="mt-2">{hangout.description}</p> */}
      <div class="flex">
        {/* Left side */}
        <div>
          <a href="/" class="flex items-center">
            <h1 class="text-gray-500 hover:text-black ml-10 mt-8">{backHome}</h1>
          </a>
          <h3 class="text-3xl font-bold ml-10">Hangout Name</h3>
          {/* <p className="mt-2 text-sm text-gray-600">{hangout.startDate} to {hangout.endDate}</p> */}
          <p class="text-gray-500 ml-10 mt-1">May 1-5, 2025</p>
        </div>
        {/* Right side */}
        <div class="ml-[40rem] flex items-end mt-3 text-sm">
          <div class="border p-2 rounded-lg flex space-x-1 items-center">
            {/* dummy url for now */}
            <p>{sharingLink}</p>
            <button onClick={handleCopy}>
              <img class="size-5 mt-0.5"src="https://img.icons8.com/?size=100&id=pNYOTp5DinZ3&format=png&color=000000"></img>
            </button>
          </div>
          <div>
            <button class="space-x-3 flex items-center bg-black text-white hover:bg-gray-800 px-4 py-2 rounded-lg ml-8">
              <div>
                <img src="https://img.icons8.com/?size=100&id=84042&format=png&color=FFFFFF" class="size-5"></img>
              </div>
              <div>
                Invite Friends
              </div>
            </button>
          </div>
        </div>
      </div>
      <div class="ml-[70rem] h-5 flex items-center">
        <span className="text-gray-700 text-sm font-semibold transition-opacity duration-300" style={{ opacity: copied ? 1 : 0 }}>
          Copied!
        </span>
      </div>
      
      <div>
        {/* Main part here */}
        <div class="border m-10 rounded-lg mt-10">
          <div class="p-3">
            <h3 class="text-2xl font-semibold">Plan Your Hangout</h3>
            <p class="text-gray-500">Collaborate with your friends to decide what to do, where to go, and when to meet</p>
          </div>
          
          {/* Tabs */}
          <div className="flex mt-6 bg-gray-100 rounded-lg overflow-hidden">
            {['Events Near You', 'Activities', 'Locations', 'Itinerary'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 text-sm font-semibold ${
                  activeTab === tab ? 'bg-white border-b-2 border-black' : 'text-gray-500'
                }`}>
                {tab}
              </button>
            ))}
          </div>
          <div className="mt-8">
            {activeTab === 'Activities' && <ActivitiesTab />}
            {activeTab === 'Locations' && <LocationsTab />}
            {activeTab === 'Events Near You' && <EventsNearYou />}
            {activeTab === 'Itinerary' && <ItineraryTab />}
          </div>
        </div>
      </div>
    </div>
      
)}

function ActivitiesTab() {
  const [activityInput, setActivityInput] = useState('');
  const [activities, setActivities] = useState([
    { id: 1, title: 'Hiking at the national park', votes: 3 },
    { id: 2, title: 'Board game night', votes: 1 },
    { id: 3, title: 'Dinner at a nice restaurant', votes: 2 },
  ]);
  const [votedActivities, setVotedActivities] = useState([]);

  const handleAddActivity = () => {
    if (activityInput.trim() !== '') {
      setActivities((prevActivities) => [
        ...prevActivities,
        { id: Date.now(), title: activityInput, votes: 0 }
      ].sort((a, b) => b.votes - a.votes));
      setActivityInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddActivity();
    }
  };

  const toggleVote = (id) => {
    setActivities((prevActivities) => {
      const updatedActivities = prevActivities.map(activity =>
        activity.id === id ? { ...activity, votes: activity.votes + (votedActivities.includes(id) ? -1 : 1) } : activity
      );
      return updatedActivities.sort((a, b) => b.votes - a.votes);
    });

    setVotedActivities((prevVoted) =>
      prevVoted.includes(id)
        ? prevVoted.filter(voteId => voteId !== id)
        : [...prevVoted, id]
    );
  };

  return (
    <div class="px-4 font-lato">
      <div>
        <h2 class="text-xl font-bold">Suggest Activities</h2>
        <p class="text-gray-500 mt-0.5">Add activities that you and your friends can do together</p>
      </div>
      <div class="flex items-center mb-6">
        <input
          type="text"
          value={activityInput}
          onChange={(e) => setActivityInput(e.target.value)}
          onKeyUp={handleKeyPress}
          placeholder="Add a new activity..."
          class="border rounded-lg w-full p-2"
        />
        <button
          onClick={handleAddActivity}
          class="bg-black text-white p-2 rounded-lg ml-2 flex items-center"
        >
          <span class="text-lg">+</span> <span class="ml-1">Add</span>
        </button>
      </div>
      <div>
        <div class="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              class="flex justify-between items-center border p-3 rounded-lg shadow-sm"
            >
              <span class="text-gray-800">{activity.title}</span>
              <div class="flex items-center space-x-2">
                <span class="text-gray-600"><b>{activity.votes} votes</b></span>
                <button
                  onClick={() => toggleVote(activity.id)}
                  className={`px-2 py-1 rounded-lg ${
                    votedActivities.includes(activity.id)
                      ? 'bg-blue-200 text-white hover:bg-gray-300 text-black'
                      : 'bg-gray-500 hover:bg-gray-600 text-white'
                  }`}
                >
                  {votedActivities.includes(activity.id) ? 'Unvote' : 'Vote'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LocationsTab() {
  return (
    <div class="flex justify-center items-center">
      {/* I was unable to get the API key cause i didnt want to do a free trial 
      With the Google Maps API, we can pull nearby places, but this one simply shows college park haha*/}
      <iframe
        width="80%"
        height="650px"
        frameborder="0"
        style={{ border: 0 }}
        src="https://www.google.com/maps/embed/v1/place?key=AIzaSyB2NIWI3Tv9iDPrlnowr_0ZqZWoAQydKJU&q=University%20of%20Maryland%2C%20College%20Park%2C%20College%20Park%2C%20MD%2C%20USA&maptype=roadmap"
        allowfullscreen
      ></iframe>
    </div>
  );
}

function EventsNearYou() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState('');
  const [keyword, setKeyword] = useState('');
  const [searchedCity, setSearchedCity] = useState('');

  const fetchEvents = async () => {
    if (!city || !keyword) return;

    setLoading(true);
    const apiKey = '0W3qyM6GyAbqVDGcbbTXgZVZp2hxb3m8';
    const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&city=${encodeURIComponent(city)}&keyword=${encodeURIComponent(keyword)}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const eventsData = data._embedded?.events || [];
      setEvents(eventsData);
      setSearchedCity(city); // update label to show the searched city
    } catch (error) {
      console.error('Error fetching events:', error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 py-4">
      <h2 className="text-xl font-bold mb-2">Find Local Events</h2>
      <div className="flex flex-col md:flex-row gap-2 mb-4">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter a city (ex: New York)"
          className="border rounded-lg p-2 w-full"
        />
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Enter keyword (ex: music)"
          className="border rounded-lg p-2 w-full"
        />
        <button
          onClick={fetchEvents}
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
        >
          Search
        </button>
      </div>

      {loading ? (
        <p>Loading events...</p>
      ) : searchedCity ? (
        <div>
          <h3 className="text-lg font-semibold mb-3">
            Events in {searchedCity} for "{keyword}"
          </h3>
          {events.length === 0 ? (
            <p>No events found.</p>
          ) : (
            <ul className="space-y-4">
              {events.map((event) => (
                <li key={event.id} className="border rounded-lg p-4 shadow-sm">
                  <strong className="text-lg">{event.name}</strong><br />
                  Date: {event.dates?.start?.localDate || 'N/A'}<br />
                  Venue: {event._embedded?.venues?.[0]?.name || 'N/A'}<br />
                  <a
                    href={event.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    More Info
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  );
}

  

function ItineraryTab() {
  return <div>Itinerary</div>;
}


function App(){
  return(
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/session/create" element={<CreateSession />} />
    <Route path="/session/join" element={<JoinSession />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/hangout/:id" element={<HangoutPage />} />
  </Routes>)
}

export default App;
