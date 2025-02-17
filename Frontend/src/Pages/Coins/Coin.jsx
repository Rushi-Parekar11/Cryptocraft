import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaRegStar, FaStar } from "react-icons/fa";
import { MdAccessAlarm } from "react-icons/md";
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { SiBitcoinsv } from "react-icons/si";
import "../Coins/Coins.css";
import {Chart as ChartJS,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend,} from 'chart.js';
ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip, Legend);
import { useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { FaLock } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        intersect: false, // Ensures tooltip activates even between data points
        mode: 'index', // Shows tooltip for closest dataset index
        callbacks: {
          label: function (context) {
            return `Price: ${context.raw}`; // Custom label for tooltip
          },
        },
      },
    },
    hover: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      x: {grid: {display: false,},ticks: {display: false, },},
      y: {grid: {display: false,},ticks: {display: false,},},
    },
    elements: {
      point: {
        radius: 0, 
      },
      line: {
        borderColor: '#ffffff', 
      borderWidth: 2, 
      },
    },
    
    interaction: {
      intersect: false,
      mode: 'index',
    },
    
    layout: {
      padding: {
        top: 1,
        bottom: 60,
      },
    },
    animation: true, 
  };
  


function Coin() {

    const [star, letstar] = useState(true);
    const [chartData, setChartData] = useState(null); 
    const [timeBtns,settimeBtns]=useState(1)
    const { coinId } = useParams();
    const [coindata,setcoindata] = useState([]);
    const [currency, setCurrency] = useState({ name: 'USD', symbol: '$' });
    const [isLoading,setIsLoading]= useState(true);
    const [isLogin,setisLogin]=useState(false);
    const navigate = useNavigate();

    const [sendName,setsendName] = useState('');
    const [sendImg,setsendImg] = useState("");
    const [sendBuyPrice,setsendBuyPrice] = useState('');
    const [price,setprice]=useState(0);
    const [userId,setUserId]=useState();
    const [username ,setusername]=useState('');
    const [BuyCoin,setBuyCoin] = useState({
      
    })

    const handelBuy = async (e) => {
      e.preventDefault();
    
      const coinData = {
        name: username, // User's name
        coin: {
          name: sendName, 
          image: sendImg, 
          buyprice: sendBuyPrice, 
          quantity: price, 
        },
      };
    
      console.log(coinData);
      try {
        const url = "https://cryptocraft-backend.vercel.app/coin/";
        const response = await axios.post(url, coinData, {
          headers: { 'Content-Type': 'application/json' },
        });
    
        toast.success(response.data.message || 'Coin purchased successfully!');
        setprice(0);
        console.log(response.data.user);
      } catch (error) {
        console.error('Error during purchase:', error.response?.data || error.message);
        toast.error(error.response?.data?.error || 'Failed to purchase coin');
      }
    };
    
    
    
    
  

///////////////////////////////////////////////////////////////  //////////////////////////////

    const handleChange = (e) => {
        setprice(e.target.value );
      };

    const fetchData = async () => {
      try {
        const options = {
          method: 'GET',
          headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-pHf31zkRTE8SGXcFdb16G8vC' },
        };
        const data = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinId}`, options)
          .then((data) => data.json());
        setcoindata(data);

        setsendName(data[0].id);
        setsendImg(data[0].image)
        setsendBuyPrice(data[0].current_price)
        setIsLoading(false); 

        console.log(data)
      } catch (err) {
        console.error(err);
      }
    };
  

    const fetchChartData = async () => {
      try {
        const options = {
          method: 'GET',
          headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-pHf31zkRTE8SGXcFdb16G8vC'}
        };
        
        const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=inr&days=${timeBtns}`,options);
        const prices = res.data.prices;
          const labels = prices.map(([timestamp]) =>
              new Date(timestamp).toLocaleDateString('en-IN')
          );
          const data = prices.map(([, price]) => price);
                  setIsLoading(false)

          setChartData({labels,datasets: [
                  {
                      label: 'Bitcoin Price (INR)',
                      data,
                      borderColor: pers > 0 ? '#00b386' : '#eb5b3c',
                      borderWidth: 3,
                      filler: true,
                  },
              ],
          });
      } catch (error) {
          console.error('Error fetching chart data:', error);
      }

  };

    useEffect(() => {
      window.scrollTo(0, 0);
        fetchData();
        fetchChartData();
        const token = localStorage.getItem("token");
        const nam =localStorage.getItem("LoggedInUser");
        setusername(nam)
        setisLogin(!!token)
    }, []);

    
    let pers = coindata[0]?.ath_change_percentage;

    const timeBtnshandel=(getdays)=>{
      setIsLoading(true);
      settimeBtns(getdays);    
      fetchChartData()
 }

const buttons = document.querySelectorAll('.timeBtns');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});



    return (
        <>
            <div className='MainContainer'>
                <div className="Allinfo">
                    <div className='DisclaimerStrip'>
                    {isLoading ? <Skeleton width={150} height={15}/> : <p className='Disclaimer'> Disclaimer:Today, 5:30 </p>}    
                    </div>

                    <div className='logoStrip'>
                        <div className="imgbox">
                        {isLoading ? <Skeleton circle={true} width={50} height={50}/> : <img src={coindata[0]?.image} alt="Coin Logo" height={'60px'} width={'60px'} />}
                        </div>
                        <div className='twoButtonDiv'>
                        {isLoading ? <Skeleton width={100} height={15} /> : <div className='WLbutton' onClick={() => letstar(!star)}>
                                {star ? <FaRegStar className='str' /> : <FaStar className='stryellow' />}
                                <p className='DisclaimerWL'>WatchList</p>
                            </div>}
                            {isLoading ? <Skeleton width={100} height={15} /> : <div className='WLbutton'>
                                <MdAccessAlarm className='str' />
                                <p className='DisclaimerWL'>Create Alert</p>
                            </div>}
                        </div>
                    </div>

                    <div className='nameStrip'>
                    {isLoading ? <Skeleton  width={200} height={30}/> : <p className='mainname'>{coinId}</p>}
                    </div>

                    {isLoading ? <Skeleton  width={200} height={30}/> :  <div className='priceStrip'>
                        <p className='mainprice'>₹ {coindata[0]?.current_price.toLocaleString('en-IN')}</p>
                        <p style={pers > 0 ? { color: 'green' } : { color: '#eb5b3c' }}>
                        {coindata[0]?.ath_change_percentage !== undefined   ? (Math.floor(coindata[0].ath_change_percentage * 10) / 100) : '--'} 
                               </p>
                    </div>}

                    {isLoading ? <Skeleton  width={799} height={400}/> :  <div className='grapStrip'>
                        <div>
                            <p className='DataPastDays'>{coinId} Price Chart (Last {timeBtns} Day)</p>
                            {chartData ? (<Line data={chartData} options={options} />) : (<p>Chart Loading ...</p>)}
                        </div>
                    </div>}

  {/* /////////// Time Buttons //////////////////                   */}
                        <div className="timedataBtn">
<button className="timeBtns active"   onClick={()=>timeBtnshandel(1)} >24hr</button>
<button className="timeBtns" onClick={()=>timeBtnshandel(6)} >1W</button>
<button className="timeBtns" onClick={()=>timeBtnshandel(15)} >15D</button>
<button className="timeBtns" onClick={()=>timeBtnshandel(30)} >1M</button> 
</div>

<hr />


{isLoading ? <Skeleton  width={799} height={300} style={{}}/> : <div className="fundamentals">
<div className='fundapart'>
<p className='mainnameFUNDAMANTALS'>Fundamentals</p>
    <div className="fundaDisclaimer">Market Cap &nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   <p className='funda'>{coindata[0]?.market_cap}</p> </div>
    <div className="fundaDisclaimer">Total Volume &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <p className='funda'>{coindata[0]?.total_volume}</p></div>
    <div className="fundaDisclaimer">Circulating supply <p className='funda'>{coindata[0]?.circulating_supply}</p></div>
    <div className="fundaDisclaimer">Total Supply  &nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<p className='funda'>{coindata[0]?.total_supply}</p></div>
    <div className="fundaDisclaimer">ath &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<p className='funda'>{coindata[0]?.ath}</p></div>
</div>
    
    <div id='hideinresponsive' className='fundapart'>
<p className='mainnameFUNDAMANTALS' >-</p>
    <div className="fundaDisclaimer">High 24h  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<p className='funda'>{coindata[0]?.high_24h}</p></div>
    <div className="fundaDisclaimer">Low 24h  &nbsp;&nbsp;  &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<p className='funda'>{coindata[0]?.low_24h}</p></div>
    <div className="fundaDisclaimer">Price Change 24h&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<p className='funda'>{coindata[0]?.price_change_24h}</p> </div>
    <div className="fundaDisclaimer">Market C Change 24h <p className='funda'>{coindata[0]?.market_cap_change_24h  }</p></div>
    <div className="fundaDisclaimer">atbh date  &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;<p className='funda'>{coindata[0]?.ath_date}</p></div>
</div>

<hr />

</div> }

                </div>

                {isLoading ? <Skeleton  width={370} height={600} style={{marginLeft:'40px'}}/> : <div className="BuyCard">
              <form onSubmit={handelBuy}>
                  <div className="buycardmain">
                  {isLoading ? <Skeleton  width={100} height={30} style={{marginTop:'20px'}}/>:<p className='buyCardName'>{coindata[0]?.id}&nbsp;&nbsp;{coindata[0]?.symbol.toUpperCase()}</p>}
                  {isLoading ? <Skeleton  width={200} height={20}/>:<p className='Disclaimer' style={{marginLeft:'10px'}}>₹{coindata[0]?.current_price.toLocaleString('en-IN')} &nbsp;&nbsp; ({Math.floor(pers*10)/100}%)</p>}
                        <hr /> 
                        
                        <div className="buycontent">
                    <p id='bcd' className='buyCardName'>Quantity : <input type="number" value={price} onChange={handleChange} id="qut" min="1"/></p>
                            <p className='buyCardName'>Per Qua : &nbsp; &nbsp; ₹{coindata[0]?.current_price.toLocaleString('en-IN')}</p>
                            <p className='buyCardName'>Required : &nbsp;&nbsp; ₹{(price * coindata[0]?.current_price).toLocaleString('en-IN')}</p>
                        </div>

                        <hr />
                        <p className='Disclaimer' style={{marginLeft:'10px'}}>Total  :&nbsp;&nbsp; ₹{(price * coindata[0]?.current_price).toLocaleString('en-IN')}</p>
                        
                    {isLogin ? <button id='buybtn' type='submit' className="btn btn-primary" >Buy</button> :
                     <button id='buybtn' type='submit' className="btn btn-primary" onClick={()=>navigate('/login')}>Login <FaLock/></button>   } 


                    </div> 
                    </form>
                </div>}
            </div>
        </>
    );
}

export default Coin;
