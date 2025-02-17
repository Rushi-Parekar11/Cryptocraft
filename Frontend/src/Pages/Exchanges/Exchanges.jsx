import React, { useEffect, useState } from 'react';
import '../Exchanges/Exchanges.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function Exchanges() {
    const [Data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const url = 'https://api.coingecko.com/api/v3/exchanges';
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'x-cg-demo-api-key': 'CG-pHf31zkRTE8SGXcFdb16G8vC'
            }
        };

        fetch(url, options)
            .then(res => res.json()) 
            .then(data => {
                setData(data); 
                setIsLoading(false);
            })
            .catch(err => {
                console.error('Error fetching exchanges:', err);
                setIsLoading(false);
            });
    }, []);

    return (
        <>
            <center>
                <h2 style={{marginTop:'20px'}}>Exchanges</h2>
            </center>

            <div className="exchange-container">
                {isLoading ? (
                    Array.from({ length: 10 }).map((_, index) => (
                        <div className="exchange-card skeleton" key={index}>
                            <Skeleton circle width={50} height={50} />
                            <div className="exchange-info">
                                <Skeleton width={120} height={20} />
                                <Skeleton width={100} height={15} />
                                <Skeleton width={80} height={15} />
                                <Skeleton width={90} height={15} />
                            </div>
                        </div>
                    ))
                ) : (
                    Data.map((exchange) => (
                        <a 
                            href={exchange.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="exchange-card"
                            key={exchange.id}
                        >
                            <img src={exchange.image} alt={exchange.name} className="exchange-logo" />
                            <div className="exchange-info">
                                <h3>{exchange.name}</h3>
                                <p><strong>Country:</strong> {exchange.country || "N/A"}</p>
                                <p><strong>Trust Score:</strong> {exchange.trust_score}</p>
                                <p><strong>24h Volume (BTC):</strong> {exchange.trade_volume_24h_btc.toFixed(2)}</p>
                            </div>
                        </a>
                    ))
                )}
            </div>
        </>
    );
}

export default Exchanges;
