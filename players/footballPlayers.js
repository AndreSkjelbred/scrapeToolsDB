const footballPlayers = [
  "Lionel Messi",
  "Cristiano Ronaldo",
  "Neymar Jr.",
  "Robert Lewandowski",
  "Kylian Mbappé",
  "Mohamed Salah",
  "Kevin De Bruyne",
  "Virgil van Dijk",
  "Sergio Ramos",
  "Manuel Neuer",
  "Jan Oblak",
  "Marc-André ter Stegen",
  "Alisson Becker",
  "Thiago Silva",
  "Marcelo",
  "Sergio Busquets",
  "Luka Modric",
  "Toni Kroos",
  "Joshua Kimmich",
  "David Alaba",
  "Jordi Alba",
  "Gerard Piqué",
  "Thomas Müller",
  "Manuel Akanji",
  "Erling Haaland",
  "Harry Kane",
  "Kevin Volland",
  "Karim Benzema",
  "Luis Suárez",
  "Antoine Griezmann",
  "Paulo Dybala",
  "Romelu Lukaku",
  "Gianluigi Donnarumma",
  "Wojciech Szczęsny",
  "Stefan de Vrij",
  "Matthijs de Ligt",
  "Kalidou Koulibaly",
  "Andrew Robertson",
  "Trent Alexander-Arnold",
  "Marcus Rashford",
  "Raheem Sterling",
  "Riyad Mahrez",
  "Bruno Fernandes",
  "Paul Pogba",
  "N'Golo Kanté",
  "Frenkie de Jong",
  "Miralem Pjanić",
  "Marco Verratti",
  "Isco",
  "Casemiro",
  "Jordan Henderson",
  "Georginio Wijnaldum",
  "Robert Firmino",
  "Sadio Mané",
  "Diego Godín",
  "José Giménez",
  "Koke",
  "Saúl Ñíguez",
  "Thomas Partey",
  "Timo Werner",
  "Kai Havertz",
  "Leroy Sané",
  "Serge Gnabry",
  "Joshua Zirkzee",
  "Donyell Malen",
  "Memphis Depay",
  "Georginio Rutter",
  "Dejan Kulusevski",
  "Federico Chiesa",
  "Ciro Immobile",
  "Lorenzo Insigne",
  "Lorenzo Pellegrini",
  "Nicolo Barella",
  "Marco Asensio",
  "Dani Carvajal",
  "Sergio Reguilón",
  "Samuel Umtiti",
  "Clement Lenglet",
  "Aymeric Laporte",
  "Ruben Dias",
  "Rúben Neves",
  "Bernardo Silva",
  "Diogo Jota",
  "Gonçalo Guedes",
  "Nuno Mendes",
  "Pedro Neto",
  "Raphaël Guerreiro",
  "Danilo Pereira",
  "Mehdi Benatia",
  "Medhi Taremi",
  "Achraf Hakimi",
  "Ismaila Sarr",
  "Wilfried Zaha",
  "Kalvin Phillips",
  "Jack Grealish",
  "James Maddison",
  "Mason Mount",
  "Phil Foden",
  "Declan Rice",
  "Harry Maguire",
  "Luka Jovic",
  "Hwang Hee-chan",
  "Leon Bailey",
  "Josip Ilicic",
  "Dries Mertens",
  "Cengiz Under",
  "Moussa Diaby",
  "Angel Di Maria",
  "Dani Olmo",
  "Giovanni Reyna",
  "Ferran Torres",
  "Sardar Azmoun",
  "Hirving Lozano",
  "Arkadiusz Milik",
  "Nicolas Pepe",
  "Milot Rashica",
  "Yusuf Yazici",
  "Houssem Aouar",
  "Nabil Fekir",
  "Andre Silva",
  "Lucas Paqueta",
  "Eduardo Camavinga",
  "Luis Alberto",
  "Mikel Oyarzabal",
  "Carlos Soler",
  "Maxence Caqueret",
  "Boubacar Kamara",
  "Achraf Bencharki",
  "Sofiane Feghouli",
  "Boulaye Dia",
  "Mohammed Kudus",
  "Andre Onana",
  "Samir Handanovic",
  "Igor Akinfeev",
  "Fernando Muslera",
  "Jasper Cillessen",
  "Yann Sommer",
  "Gianluigi Buffon",
  "Mike Maignan",
  "Ben Foster",
  "Keylor Navas",
  "Ondrej Kolar",
  "Walter Benitez",
  "Gianluca Donnarumma",
  "Pau Lopez",
  "Emiliano Martinez",
  "Alexander Isak",
  "Luis Alberto",
  "Harry Maguire",
  "Kurt Zouma",
  "Thiago Alcantara",
  "Adama Traore",
  "Jamie Vardy",
  "Wilfred Ndidi",
  "Richarlison",
  "Allan Saint-Maximin",
  "Raul Jimenez",
  "Jadon Sancho",
  "Raphael Varane",
  "Declan Rice",
  "Kalvin Phillips",
  "Bruno Guimarães",
  "Matheus Cunha",
  "Emil Forsberg",
  "Felix Passlack",
  "Alessandro Bastoni",
  "Juan Cuadrado",
  "Fabián Ruiz",
  "Arkadiusz Milik",
  "Eduardo Camavinga",
  "Erling Braut Haaland",
  "Bukayo Saka",
  "Boubacar Kamara",
  "Curtis Jones",
  "Maxence Lacroix",
  "Ozan Kabak",
  "Ismaël Bennacer",
  "Federico Bernardeschi",
  "Andrea Belotti",
  "Francesco Caputo",
  "Mattia Perin",
  "Bryan Reynolds",
  "Caden Clark",
  "Tyler Adams",
  "Lucas Ocampos",
  "Papu Gomez",
  "Youssef En-Nesyri",
  "Rui Patrício",
  "Nelson Semedo",
  "Ruben Dias",
  "Luca Waldschmidt",
  "Wout Weghorst",
  "Renato Sanches",
  "Steven Berghuis",
  "Gini Wijnaldum",
  "Toby Alderweireld",
  "Bartosz Bereszynski",
  "Ricardo Pereira",
  "Mehdi Taremi",
  "Rodrigo De Paul",
  "Jules Koundé",
  "Iñaki Williams",
  "Frenkie de Jong",
  "Niklas Süle",
  "Corentin Tolisso",
  "Alex Telles",
  "Sander Berge",
  "Matteo Guendouzi",
  "Emi Buendia",
  "Jann-Fiete Arp",
  "Krzysztof Piatek",
  "Dejan Kulusevski",
  "Ozan Tufan",
  "Gerson",
  "Achraf Hakimi",
  "Nicolas Tagliafico",
  "Giovanni Di Lorenzo",
  "Vedat Muriqi",
  "Marcus Thuram",
  "Denis Zakaria",
  "Julian Brandt",
  "Karim Adeyemi",
  "Tanguy Ndombele",
  "Aurelien Tchouameni",
  "Florian Neuhaus",
  "Maximilian Philipp",
  "Nicolas Gonzalez",
  "Thorgan Hazard",
  "Mateusz Klich",
  "Jens Toornstra",
  "Piotr Zielinski",
  "Tomas Soucek",
  "Jan Boril",
  "Ondrej Celustka",
  "Jannik Vestergaard",
  "Mikkel Damsgaard",
  "Nicolai Boilesen",
  "David de Gea",
  "Gabriel Jesus",
  "Raphael Guerreiro",
  "Lorenzo Insigne",
  "Luka Jovic",
  "Pele",
  "Diego Maradona",
  "Johan Cruyff",
  "Michel Platini",
  "Franz Beckenbauer",
  "Zinedine Zidane",
  "Ronaldo (Brazilian)",
  "Paolo Maldini",
  "George Best",
  "Bobby Charlton",
  "Gerd Muller",
  "Lev Yashin",
  "Eusebio",
  "Ferenc Puskas",
  "Roberto Baggio",
  "Lothar Matthaus",
  "Marco van Basten",
  "Franco Baresi",
  "Ruud Gullit",
  "Ronaldinho",
  "Thierry Henry",
  "Cafu",
  "Carlos Valderrama",
  "Hristo Stoichkov",
  "Michael Laudrup",
  "Didier Drogba",
  "Samuel Eto'o",
  "Andres Iniesta",
  "Xavi",
  "David Beckham",
  "Gary Lineker",
  "Alessandro Nesta",
  "Javier Zanetti",
  "Paolo Rossi",
  "Romario",
  "Rivaldo",
  "Roberto Carlos",
  "Peter Schmeichel",
  "Edwin van der Sar",
  "Fabio Cannavaro",
  "Diego Forlan",
  "Andriy Shevchenko",
  "Landon Donovan",
  "David Villa",
  "Luis Figo",
  "Kaka",
  "Frank Lampard",
  "Steven Gerrard",
  "Ryan Giggs",
  "Roy Keane",
  "Edgar Davids",
  "Nemanja Vidic",
  "Sol Campbell",
  "Rui Costa",
  "Fabio Grosso",
  "Vincent Kompany",
  "Claude Makelele",
  "Philipp Lahm",
  "John Terry",
  "Rio Ferdinand",
  "Paolo Di Canio",
  "Alessandro Del Piero",
  "Zlatan Ibrahimovic",
  "Francesco Totti",
  "Clarence Seedorf",
  "Christian Vieri",
  "Hernan Crespo",
  "Jay-Jay Okocha",
  "Marcel Desailly",
  "Oliver Kahn",
  "Jens Lehmann",
  "Juan Roman Riquelme",
  "Michael Owen",
  "Gabriel Batistuta",
  "Carlos Tevez",
  "Deco",
  "Samuel Kuffour",
  "Asamoah Gyan",
  "Emmanuel Adebayor",
  "Raul",
  "Ivan Cordoba",
  "Lilian Thuram",
  "Carles Puyol",
  "Joan Capdevila",
  "Gaizka Mendieta",
  "Eidur Gudjohnsen",
  "Mario Kempes",
  "Peter Beardsley",
  "Kenny Dalglish",
  "Ian Rush",
  "John Barnes",
  "Paul Gascoigne",
  "Bryan Robson",
  "Kevin Keegan",
  "Alan Shearer",
  "Gary Neville",
  "Paul Scholes",
  "Steve McManaman",
  "Jamie Carragher",
];

const nonDup = Array.from(new Set(footballPlayers));

module.exports = nonDup;