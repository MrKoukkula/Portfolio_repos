Loppuraportti Mobiiliohjelmointi-kurssille Haaga-Heliaan.

Tehty projekti:
React Nativella toteutettu pieni kuvajulkaisujen lataussovellus, jossa jokainen käyttäjä voi ladata
julkaisuja julkiseen listaukseen, hieman Instagramin tyyliin.

Käytetyt tekniikat:
- React Native Navigation Stack & Bottom Tabs
- Expo Camera SDK
- React Native Elements
- Firebase tietokanta julkaisujen säilyttämiseen 
  (sisältää myös url osoitteen storagessa oleviin kuviin)
- Firebase Storage kuvien tallentamiseen.

Sovellus on jaettu seuraaviin osiin:

App.js on sovelluksen navigaation keskus. Navigoinnissa käyttäjä voi siirtyä kotisivulle (kotisivu stack) tai lisäämään uuden julkaisun. Kotisivulla käyttäjä voi klikata kuvaa, jonka kautta hän siirtyy koko ruudun kuvaan. Jos käyttäjä painaa julkaisua pitkään, hän voi poistaa julkaisun.

Kotisivu navigointistack sisältää kotisivun sekä koko ruudun kuvasivun. Kotisivulla käyttäjä näkee aikajärjestyksessä olevat julkaisut ja voi niitä klikkaamalla siirtyä tarkastelemaan koko kuvaa.

Uuden julkaisun luontisivulle käyttäjä voi ottaa kuvan, asettaa sille otsikon ja kuvaselityksen. Julkaisun jälkeen kuva tallennetaan firebasen storageen, jonka jälkeen julkaisu tallennetaan tietokantaan.

Kehityskohteita:
Sovellusta voisi helposti kehittää lisäämällä tunnistautumisen, jolloin käyttäjät voisivat poistaa vain omia julkaisuja tai editoida niitä. Lisäksi tietokanta ja storage ei ole paras mahdollinen tämänkaltaiseen sovellukseen, mutta näin demotarkoitukseen se on sopiva. Kun julkaisuja tulisi lisää, tarvittaisiin myös lazyloading julkaisuille niitä selaillessa, ettei sovellus jumiutuisi kuvien suuresta määrästä.