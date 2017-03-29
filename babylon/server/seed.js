const db = require('./models')


let composerArray = [
  {
      name: "Bach",
      description: "Johann Sebastian Bach (1685-1750) was a German composer in the early Baroque period who was known for his innovation in counterpoint and harmonic organization. He was one of the first composers to embed intellectual motifs into his pieces and is remembered today for both the beauty and technical depth of his pieces.",
      timeperiod: "Baroque",
      born: "March 21, 1685",
      birthCountry: "Germany",
      meshName: "T8"
  },

  {
      name: "Handel",
      description: "George Frideric Handel (1685-1759) was a German, and later British, baroque era composer who made great strides in the realm of opera and choral works. He is remembered not only for his musical creations but also as a dramatic genius. Over his lifespan, he composed more than forty operas, of which Messiah remains a frequently performed staple across the world.",
      timeperiod: "Baroque",
      born: "February 23, 1685",
      birthCountry: "Germany",
      meshName: "T9"
  },
  {
      name: "Telemann",
      description: "Georg Philipp Telemann (1681-1767) was a German Baroque composer and one of the most prolific composers in history, considered by his contemporaries as a leading composer. His style is seen as a link between the Baroque and later Classical period and contains French and Italian themes.",
      timeperiod: "Baroque",
      born: "March 14, 1681",
      birthCountry: "Germany",
      meshName: "T10"
  },
  {
      name: "Pachelbel",
      description: "Johann Pachelbel (1653-1706) was a German middle-baroque era composer whose work consisted mostly of sacred and secular music. He is widely remembered for his famous Canon in D, which is still performed prolifically at various venues across cultures. His composition style consists of a more straight-forward style that emphasizes harmonic and melodic clarity.",
      timeperiod: "Baroque",
      born: "September 1, 1653",
      birthCountry: "Germany",
      meshName: "T6"
  },
  {
      name: "Vivaldi",
      description: "Antonio Vivaldi (1678-1741) was an Italian Baroque composer. His influence was extremely widespread across Europe during his lifetime. His work primarily consisted of instrumental concertos for stringed instruments but also forty operas. His musical style is noted for its innovative melodies and harmonic contrasts, and portrays an exuberant mood.",
      timeperiod: "Baroque",
      born: "March 4, 1678",
      birthCountry: "Italy",
      meshName: "T7"
  },
  {
      name: "Haydn",
      description: "Franz Joseph Haydn (1732-1809) was an Austrian composer of the Classical period known as the Father of the Symphony and String Quartet. During his lifetime, he served as a mentor to Mozart and a teacher to Beethoven. His musical style can be characterized as tonal and double in nature, combining two alternating themes at once.",
      timeperiod: "Classical",
      born: "March 31, 1685",
      birthCountry: "Austria",
      meshName: "T11"
  },
  {
      name: "Salieri",
      description: "Antonio Salieri (1750-1825) was an Italian Classical era composer. He was a pivotal figure in the development of opera and throughout his life, was a sought-after teacher. His list of pupils include Liszt, Schubert, and Beethoven. ",
      timeperiod: "Classical",
      born: "August 18, 1750",
      birthCountry: "Italy",
      meshName: "T12"
  },
  {
      name: "Hummel",
      description: "Johann Nepomuk Hummel (1778-1837) was an Austrian composer of the late Classical period and much of his music reflects the transition to the Romantic. His talent was recognized by Mozart, who served as his teacher free-of-charge for over two years. His style is seen as clean and disciplined as opposed to the more ornate style that was rising in popularity during his lifetime. ",
      timeperiod: "Classical",
      born: "November 14, 1778",
      birthCountry: "Hungary",
      meshName: "T13"
  },
  {
      name: "Tchaikovsky",
      description: "Pyotr Ilyich Tchaikovsky (1840-1893) was a Russian late-Romantic composer whose works are among the most popular music in today’s classical repertoire. As the first Russian to gain international recognition, his works displayed a large range of depth, grandeur, and exoticism.",
      timeperiod: "Romantic",
      born: "May 7, 1840",
      birthCountry: "Russia",
      meshName: "T27"
  },
  {
      name: "Mozart",
      description: "Wolfgang Amadeus Mozart (1756-1791) was an Austrian composer of the Classical era who is still one of the most famous musicians of all time. Although he only lived to be 35, his prolific compositions beginning from his early childhood continue to define the repertoire of classical musicians today. Many other composers regard him as the best of all time and Haydn once said that posterity will not see such a talent for centuries. ",
      timeperiod: "Classical",
      born: "January 27, 1756",
      birthCountry: "Austria",
      meshName: "T28"
  },
  {
      name: "Beethoven",
      description: "Ludwig van Beethoven (1770-1827) was a German composer who was crucial to the transition between the Classical and Romantic periods. Known as the “greatest living composer” during his lifetime, he remains one of the most influential figures in musical history. Although deaf in the last decades of his life, he produced his most admired works in that period. His style is defined as heroic and triumphant, expanding on the formal structural themes shown by his predecessors while contributing his own touch that eventually influenced a swath of Romantic era composers. ",
      timeperiod: "Romantic",
      born: "December 16, 1770",
      birthCountry: "Germany",
      meshName: "T29"
  },
  {
      name: "Brahms",
      description: "Johannes Brahms (1833-1897) was a German composer of the Romantic era who is considered by history as both a traditionalist and innovator. His music has deep roots in the techniques of Classical masters, and has very meticulous yet romantic nature. His music is seen as very complex and absolute, as he saw music as a pure form of art and not as a portrayal of other things. ",
      timeperiod: "Romantic",
      born: "May 7, 1833",
      birthCountry: "Germany",
      meshName: "T30"
  },
  {
      name: "Chopin",
      description: "Frédéric François Chopin (1810-1849) was a Polish composer of the Romantic era who is primarily known for his work for the solo piano. Known as a “poetic genius without equal”, Chopin’s music is known for its technical demand and emotional nuances. Citing Bach and Mozart as his two important influences, he adds a level of sophisticated passion to his compositions. ",
      timeperiod: "Romantic",
      born: "March 1, 1810",
      birthCountry: "Poland",
      meshName: "T31"
  },
  {
      name: "Dvorak",
      description: "Antonín Leopold Dvořák (1841-1904) was a Czech composer of the late Romantic period. His style heavily incorporates “the fullest recreation of a national idiom” and range from operas to nine full-fledged symphonies. He generally stuck to the classical model, incorporating Czech folk music themes into his melodies and rhythms.",
      timeperiod: "Romantic",
      born: "September 8, 1841",
      birthCountry: "Czech Republic",
      meshName: "T32"
  },
  {
      name: "Liszt",
      description: "Franz Liszt (1811-1886) was a Hungarian composer of the Romantic era who was known as a prodigious pianist during his lifetime. As one of the most prominent members of the New German School, he was known for his invention of the symphonic poem and radical departures from traditional harmony.  His style is seen as liberal and evocative, defying that of many of his contemporaries.",
      timeperiod: "Romantic",
      born: "October 22, 1811",
      birthCountry: "Austria",
      meshName: "T34"
  },
  {
      name: "Schubert",
      description: "Franz Schubert (1797-1828) was an Austrian composer of the Romantic period who was extremely prolific although he only lived to be 32. Championed by Brahms and Liszt among other greats, he was one of the most performed composers of the nineteenth century. His works are defined by pleasant melodies and an easy-going charm. ",
      timeperiod: "Romantic",
      born: "January 31, 1797",
      birthCountry: "Austria",
      meshName: "T35"
  },
  {
      name: "Prokofiev",
      description: "Sergei Prokofiev (1891-1953) was a Russian post-Romantic composer who is acknowledged as a creator of masterpieces across numerous genres. Known for his ferociously dissonant music for the piano, he also created beautifully melodic symphonies for orchestras. ",
      timeperiod: "Post-Romantic",
      born: "April 23, 1891",
      birthCountry: "Ukraine",
      meshName: "T36"
  },
  {
      name: "Vaughan Williams",
      description: "Ralph Vaughan Williams (1872-1958) was one of the best known English composers. His orchestral compositions include nine symphonies and marked a traditional break from British music. Much of his music tells stories about different experiences in his life and portrays scenes throughout history. ",
      timeperiod: "Post-Romantic",
      born: "October 12, 1872",
      birthCountry: "England",
      meshName: "T37"
  },
  {
      name: "Stravinsky",
      description: "Igor Stravinsky (1882-1971) was a Russian composer and one of the most influential of the 20th century. His career is notable for its stylistic diversity and rhythmic energy. Later in his life, he was known as one of music’s primary innovators and is one of the most prolifically performed among modern orchestras around the world. ",
      timeperiod: "Post-Romantic",
      born: "June 17, 1882",
      birthCountry: "Russia",
      meshName: "T38"
  },
  {
      name: "Sousa",
      description: "John Philip Sousa (1854-1932) was an American composer and conductor of the late Romantic era who is known for his military and patriotic marches. Known as the “March King”, his works are performed on American holidays. ",
      timeperiod: "Post-Romantic",
      born: "November 6, 1854",
      birthCountry: "United States of America",
      meshName: "T39"
  },
  {
      name: "Ives",
      description: "Charles Ives (1874-1954) was one of the only Americans to gain international recognition and a post-Romantic and modernist composer. Known as an American Original, he was largely ignored during his lifetime. His music is experimental, and focuses on traditional and patriotic hymns. ",
      timeperiod: "Post-Romantic",
      born: "October 20, 1874",
      birthCountry: "United States of America",
      meshName: "T40"
  },
  {
      name: "Shostakovich",
      description: "Dmitri Shostakovich (1906-1975) was a prominent Russian composer of the twentieth century. His music is defined by sharp contrasts and ambivalent tonality. His large symphonies remain entrenched as part of traditionally performed classical repertoire. ",
      timeperiod: "Post-Romantic",
      born: "September 25, 1906",
      birthCountry: "Russia",
      meshName: "T41"
  },
  {
      name: "Saint-Saens",
      description: "Camille Saint-Saëns (1835-1921) was a French composer of the late Romantic era. First discovered as a musical prodigy, he influenced many of the twentieth century composers to come. As a youth, he was regarded as a modernist but his music always kept the great classical minds such as Mozart as the foundation of his works. His exotic instrumentation and deft harmonisation recharacterized the way orchestras grouped musicians.",
      timeperiod: "Post-Romantic",
      born: "October 9, 1835",
      birthCountry: "France",
      meshName: "T42"
  },{
      name: "Varèse",
      description: "Edgard Varèse's (1883 - 1965) music emphasizes timbre and rhythm and he coined the term 'organized sound' in reference to his own musical aesthetic. Varèse's conception of music reflected his vision of 'sound as living matter' and of 'musical space as open rather than bounded'. Emphasis on timbre, rhythm, and new technologies inspired a generation of musicians who came of age during the 1960s and 1970s. One of Varèse's greatest fans was the American guitarist and composer Frank Zappa, who, upon hearing a copy of The Complete Works of Edgard Varèse, Vol. 1 became obsessed with the composer's music.",
      timeperiod: "Contemporary",
      born: "December 22, 1883",
      birthCountry: "France",
      meshName: "T43"
  },{
      name: "Stockhausen",
      description: "Karlheinz Stockhausen (1928 - 2007) was a contemporary German composer widely regarded as the most important composers of the 20th and early 21st century. Described as 'one of the great visionaries of 20th-century music'. He is known for his groundbreaking work in electronic music, aleatory (controlled chance) in serial composition, and musical spatialization. His theoretical and other writings comprise ten large volumes. He received numerous prizes and distinctions for his compositions, recordings, and for the scores produced by his publishing company.",
      timeperiod: "Contemporary",
      born: "August 22, 1928",
      birthCountry: "German",
      meshName: "T45"
  },{
      name: "Xenakis",
      description: "Iannis Xenakis (1922 - 2001) He is considered an important post-World War II composer whose works helped revolutionize 20th century classical music. Xenakis supported himself by composition and teaching, and quickly became recognized as one of the most important European composers of his time. He became especially known for his musical research in the field of computer-assisted composition, for which he founded the Equipe de Mathématique et Automatique Musicales. Xenakis wrote a collection of texts on applications of stochastic processes, game theory and computer programming in music.",
      timeperiod: "Contemporary",
      born: "August 22, 1928",
      birthCountry: "Romania",
      meshName: "T44"
  },
  {
      name: "Sibelius",
      description: "Jean Sibelius (1865 - 1957) was a Finnish composer of the late Romantic and early Modern period. Widely recognized as a national hero and Finalnd's finest composer, his music helped his nation develop a national identity during its struggle from independence from Russia. His seven symphonies are staples at modern orchestras.",
      timeperiod: "Post-Romantic",
      born: "December 8, 1865",
      birthCountry: "Finland",
      meshName: "T25"
  },
  {
      name: "Mendelssohn",
      description: "Felix Mendelssohn (1809-1847) was a German composer of the early Romantic period. His musical taste was more conservative than those of his contemporaries, which include Liszt. Among his works include concertos, symphonies, and chamber works. He was among the most popular composers of the Romantic period.",
      timeperiod: "Romantic",
      born: "February 3, 1809",
      birthCountry: "Germany",
      meshName: "T26"
  }
]


const seedComposers = () => db.Promise.map(composerArray, composer => db.model('composer').create(composer))

db.sync({force: true})
.then(() => seedComposers())
.catch(error => console.error(error))
.finally(() => db.close())
