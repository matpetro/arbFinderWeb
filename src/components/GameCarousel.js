import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import GameInfo from "./GameInfo";

function GameCarousel(props) {

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 1500 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 1500, min: 1200 },
          items: 4
        },
        tablet: {
          breakpoint: { max: 1200, min: 464 },
          items: 3
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
    };

// conditional render for the arb carousal, if no arbs display a message of some kind
    return (
        <div className="game-car">
            <div className="header">{props.header}</div>
            {(props.info).length === 0 ? <div className="empty-info">{props.emptyMessage}</div> :
                <Carousel responsive={responsive} itemClass="car-item" partialVisible={false}>
                    {
                        (props.info).map( game => <GameInfo key={game.home + game.away} {...game} /> )
                    }
                </Carousel>
            }
        </div>
        
    );
};

export default GameCarousel;