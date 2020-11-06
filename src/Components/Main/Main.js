import React from 'react';

function Main() {

    return (
        <main className="main">
            <section className="main__section section">
                <h2 className="section__title">
                    О проекте.
            </h2>
                <p className="section__text">
                    Мы знаем, что наши дети постоянно существуют в режиме непрекращающегося творческого процесса. Мы видим это, когда ребёнок что-то напевает, когда он бесконечно рисует, когда придумывает истории, когда разговаривает с едой и игрушками — дети постоянно включены и что-то изобретают. Родители часто недооценивают это спонтанное творчество ребёнка. Это не плохо, просто мы привыкаем к этому. Давайте попробуем внимательнее присмотреться к нашим детям.
            </p>
                <p className="section__text">
                    Мы запускаем проект «ТУРБИНА», который открывает работу настоящего музыкального лейбла на базе «Маршака». В рамках «ТУРБИНЫ» лучшие современные инди-музыканты пишут свои песни на стихи, написанные детьми. Здесь важно — мы не заставляем наших детей садиться и писать поэзию, мы говорим о том, что родителям стоит быть более внимательными и чуткими к своим детям. Именно так мы сможем получить тексты, которые перестанут быть детскими, не будут осмыслены как взрослые — поэзия, которая сокращает дистанцию между взрослостью и детством, где спонтанное детское творчество и бессознательное, замеченное родителем, становится общественным культурным достоянием.
            </p>
            </section>
            <section className="section main__section">
                <h2 className="section__title">
                    Как это работает?
                </h2>
                <p className="section__text">
                    Вы можете прислать нам тексты, родившиеся у ваших детей, которые вы записали и считаете, что это сильное высказывание. Мы собираем пул таких текстов и передаём их музыкантам. Артисты создают музыку на эти стихи. Мы продюсируем выпуск трека, возможно съёмки клипа и так далее. Мы всегда указываем автора стихотворений внутри релиза: Хадн Дадн feat. Варя Карпова и Федя Быстров — Контур.
                </p>
            </section>
            <section className="section main__section">
                <h2 className="section__title">
                    Тезисы.
                </h2>
                <ul className="section__list">
                    <li className="section__list-item">Дети никогда не прекращают творить и круто стараться быть на них похожими в этом.</li>
                    <li className="section__list-item">Детское бессознательное помогает родителям понять, что происходит внутри семьи.</li>
                    <li className="section__list-item">Не существует детской и взрослой поэзии. Существует мысль и чувство, зафиксированное в ней.</li>
                    <li className="section__list-item">Дети получают невероятное удовольствие и мотивацию от того, что их творчество востребовано сверстниками и взрослыми.</li>
                </ul>
            </section>
            <section className="section main__section">
            <h2 className="section__title">Форма.</h2>
                <p className="section__text">
                    Заполняя эту форму, вы становитесь частью проекта.
                </p>
            <form action="index.html" method="POST" className="main__form form">                
                <input type="text" id="name" required name="name" className="form__input" placeholder="Имя и фамилия автора" />
                <span id="name-input-error" class="form__input-error">Какая-то ошибка*</span>
                <input type="email" id="email" required name="email" className="form__input" placeholder="Почта" />
                <span id="email-input-error" class="form__input-error">Какая-то ошибка*</span>
                <input type="tel" id="name" required name="name" className="form__input" placeholder="Телефон" />
                <span id="tel-input-error" class="form__input-error">Какая-то ошибка*</span>
                <textarea name="" id="poem" required name="poem" className="form__input" placeholder="Стихи"></textarea>
                <input type="checkbox" id="formCheckbox" required className="form__checkbox" />
                <label htmlFor="formCheckbox" className="form__check-label">               
                Согласен с <a href="#" target="_blank" className="form__link">офертой</a>              
                </label>
                <input type="submit" value="Отправить" className="form__btn" />
            </form>
            </section>    
        </main>        
    )
}

export default Main;