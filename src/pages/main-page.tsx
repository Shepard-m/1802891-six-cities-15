import Container from '../components/container';
import { City } from '../types/city';
import { Offer } from '../types/offer';
import ListCards from '../components/list-cards';
import Map from '../components/map';
import { MouseEvent, useState } from 'react';
import MainEmpty from '../components/main-empty';

type TMainPageProps = {
  offers: Offer[];
}

export default function MainPage({ offers }: TMainPageProps) {

  const [selectedOffer, setSelectedOffer] = useState<Offer | undefined>(
    undefined
  );

  const [selectedCity, setSelectedCity] = useState<City>({
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    }
  });

  const handleListItemHover = (currentCard: Offer) => {
    const currentPoint = offers.find((offer) => offer.title === currentCard.title);
    if (currentPoint !== undefined) {
      setSelectedOffer(currentPoint);
    }
  };

  const handleCurrentCityClick = (evt: MouseEvent<HTMLSpanElement>) => {
    evt.preventDefault();

    const currentOffer = offers.find((offer) => offer.city.name === evt.target.textContent);

    if (currentOffer !== undefined) {
      setSelectedCity({ ...currentOffer?.city });
      offers.filter((offer) => offer.city.name === currentOffer.city.name);
    }

  };

  return (
    <Container pageClass='page--gray page--main' mainClass='index'>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list" onClick={handleCurrentCityClick}>
            <li className="locations__item">
              <a className="locations__item-link tabs__item" href="#">
                <span>Paris</span>
              </a>
            </li>
            <li className="locations__item">
              <a className="locations__item-link tabs__item" href="#">
                <span>Cologne</span>
              </a>
            </li>
            <li className="locations__item">
              <a className="locations__item-link tabs__item" href="#">
                <span>Brussels</span>
              </a>
            </li>
            <li className="locations__item">
              <a className="locations__item-link tabs__item tabs__item--active">
                <span>Amsterdam</span>
              </a>
            </li>
            <li className="locations__item">
              <a className="locations__item-link tabs__item" href="#">
                <span>Hamburg</span>
              </a>
            </li>
            <li className="locations__item">
              <a className="locations__item-link tabs__item" href="#">
                <span>Dusseldorf</span>
              </a>
            </li>
          </ul>
        </section>
      </div>
      <div className="cities">
        <div className="cities__places-container container">

          {offers.length !== 0 ?
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} places to stay in Amsterdam</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <ListCards offers={offers} onListItemHover={handleListItemHover} />
            </section> : <MainEmpty currentCity={selectedCity} />}

          {offers.length &&
            <div className="cities__right-section">
              <Map city={selectedCity} offers={offers} selectedOffer={selectedOffer} />
            </div>}

        </div>
      </div>
    </Container>
  );
}