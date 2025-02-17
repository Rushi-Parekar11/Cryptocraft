import React, { useEffect, useState } from 'react';
import '../Portfolio/Portfolio.css';
import { MdAccessAlarm } from "react-icons/md";

function Portfolio() {
    const [name, setName] = useState('');
    const [portfolio, setPortfolio] = useState([]);
    const [Alldata, setAlldata] = useState([]);
    const [totalInvested, setTotalInvested] = useState(0);
    const [totalReturn, setTotalReturn] = useState(0);
    const [totalCurrentValue, setTotalCurrentValue] = useState(0);

    const fetchPortfolio = async () => {
        try {
            const response = await fetch('http://localhost:8080/portfolio', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'username': name,
                },
            });
            if (!response.ok) throw new Error(`Error: ${response.statusText}`);
            
            const data = await response.json();
            if (data.success) {
                setPortfolio(data.buycoins);
            } else {
                console.log(data.error || 'Failed to fetch portfolio data');
            }
        } catch (err) {
            console.log(err.message);
        }
    };

    const fetchData = async () => {
        try {
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD`, {
                method: 'GET',
                headers: { accept: 'application/json' },
            });
            const data = await response.json();
            setAlldata(data);
        } catch (err) {
            console.error('Error fetching data:', err);
        }
    };

    useEffect(() => {
        const storedName = localStorage.getItem("LoggedInUser");
        if (storedName) setName(storedName);
        fetchData();
    }, []);

    useEffect(() => {
        if (name) fetchPortfolio();
    }, [name]);

    useEffect(() => {
        if (portfolio.length > 0 && Alldata.length > 0) {
            let totalInvestedAmount = 0;
            let totalReturnAmount = 0;
            let totalCurrentAmount = 0;

            portfolio.forEach((data) => {
                const investedValue = data.buyprice * data.quantity;
                totalInvestedAmount += investedValue;

                const coinData = Alldata.find(coin => coin.id === data.name);
                if (coinData) {
                    const currentValue = coinData.current_price * data.quantity;
                    totalCurrentAmount += currentValue;
                    totalReturnAmount += currentValue - investedValue;
                }
            });

            setTotalInvested(totalInvestedAmount);
            setTotalReturn(totalReturnAmount);
            setTotalCurrentValue(totalCurrentAmount);
        }
    }, [portfolio, Alldata]);

    return (
        <div className="portfolioMain">
            <div className='logoStrip'>
                <h5>Holdings [{portfolio.length}]</h5>
                
            </div>

            <center><div className="pricesInfo">
                <div className="values"><h2>₹ {totalCurrentValue.toFixed(2)}</h2><p>Current Value</p></div>
                <div className='threestripDiv'>
                    <div className='threestrip'><p>Total Coins</p><p>{portfolio.length}</p></div>
                    <div className='threestrip'><p>Invested Value</p> <p>₹ {totalInvested.toFixed(2)}</p></div>
                    <div className='threestrip'><p>Total Return</p> <p style={totalReturn >= 0 ? {color: '#00b386'} : {color: '#eb5b3c'}}>₹ {totalReturn.toFixed(2)}</p></div>
                </div>
            </div></center>

            <center><div className="infostrip">
                <h6>COIN</h6>
                <h6>BUY PRICE</h6>
                <h6>CURRENT PRICE</h6>
                <h6>RETURN</h6>
            </div></center>

<center>
            {portfolio.length === 0 ? (
                <h1>No Holdings</h1>
            ) : (
                portfolio.map((data, index) => {
                    const coinData = Alldata.find(coin => coin.id === data.name);
                    const currentPrice = coinData ? coinData.current_price : "N/A";
                    const investedValue = data.buyprice * data.quantity;
                    const currentValue = currentPrice !== "N/A" ? currentPrice * data.quantity : "N/A";
                    const returnValue = currentValue !== "N/A" ? currentValue - investedValue : "N/A";

                    return (
                        <div className="mainStrip" key={index}>
                            <div className="mainStripDivs">
                                <img src={data.image} id="stripimg" alt="coin" />
                                {data.name}
                            </div>
                            <div className="mainStripDivs">₹ {investedValue.toFixed(2)}</div>
                            <div className="mainStripDivs">₹ {currentValue !== "N/A" ? currentValue.toFixed(2) : "N/A"}</div>
                            <div className="mainStripDivs" style={returnValue > 0 ? {color:'#00b386'}:{color:'#eb5b3c'}}>
                                ₹ {returnValue !== "N/A" ? returnValue.toFixed(2) : "N/A"}
                            </div>
                        </div>
                    );
                })
            )}
            </center>
        </div>
    );
}

export default Portfolio;