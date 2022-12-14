import React, { useEffect, useRef } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  let scrollPos = 0
  const ref = useRef()
  useEffect(() => {
    window.addEventListener('wheel', function(event)
    {
     if (event.deltaY > 0)
     {
        scrollPos = scrollPos + 80
     }
     else if (event.deltaY < 0)
     {
      if (scrollPos > 0) {
        scrollPos = scrollPos - 80
      }
     }
     ref.current.scrollLeft = scrollPos
    });
  }, [])
  
  return (
    <main className="content">
      <section className="profile">
        <button className="profile__avatar-edit" type="button" title="Обновить аватар" onClick={props.onEditAvatar}>
          <img className="profile__avatar" src={currentUser.avatar} alt={currentUser.name}/>
        </button>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button className="profile__btn-edit" type="button" title="Редактировать профиль" onClick={props.onEditProfile}/>
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button className="profile__btn-add" type="button" title="Добавить новую фотографию" onClick={props.onAddPlace}/>
      </section>

      <section className="elements">
        <ul className="elements__list" ref={ref}>
          {props.cards.map((card, id) => (
            <Card
              key={id}
              card={card}
              link={card.link}
              name={card.name}
              likes={card.likes.length}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  )
}

export default Main;
