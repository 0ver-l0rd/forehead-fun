export interface Character {
  name: string;
  genre: Genre;
  description: string;
  image?: string; // Hardcoded high-quality image URL
}

export type Genre =
  | "Anime & Animations"
  | "Spies & Action"
  | "Video Game Heroes"
  | "General Celebrities"
  | (string & {}); // Allow custom AI themes while keeping autocompletion

export const GENRES: Genre[] = [
  "Anime & Animations",
  "Spies & Action",
  "Video Game Heroes",
  "General Celebrities",
];

export const GENRE_EMOJIS: Record<Genre, string> = {
  "Anime & Animations": "🎌",
  "Spies & Action": "🕵️",
  "Video Game Heroes": "🎮",
  "General Celebrities": "⭐",
};

export const characters: Character[] = [
  // Anime & Animations
  {
    name: "Rimuru Tempest",
    genre: "Anime & Animations",
    description: "An overpowered main character who reincarnated as a slime and built a massive monster nation.",
    image: "https://images.alphacoders.com/112/1126569.jpg"
  },
  { name: "Goku", genre: "Anime & Animations", description: "A Saiyan warrior who constantly trains to become the strongest fighter in the universe." },
  { name: "Naruto Uzumaki", genre: "Anime & Animations", description: "A hyperactive ninja who dreams of becoming Hokage and carries a nine-tailed fox inside him." },
  { name: "Luffy", genre: "Anime & Animations", description: "A rubber-bodied pirate captain searching for the One Piece treasure to become King of the Pirates." },
  { name: "Levi Ackerman", genre: "Anime & Animations", description: "Humanity's strongest soldier known for his deadly skill with ODM gear against Titans." },
  { name: "Light Yagami", genre: "Anime & Animations", description: "A genius student who finds a notebook that kills anyone whose name is written in it." },
  { name: "Spike Spiegel", genre: "Anime & Animations", description: "A laid-back bounty hunter in space with a mysterious past and incredible martial arts skills." },
  { name: "Saitama", genre: "Anime & Animations", description: "A hero who can defeat any opponent with a single punch but is bored by the lack of challenge." },
  { name: "Tanjiro Kamado", genre: "Anime & Animations", description: "A kind-hearted boy who becomes a demon slayer to save his sister who was turned into a demon." },
  { name: "Sailor Moon", genre: "Anime & Animations", description: "A clumsy schoolgirl who transforms into a magical warrior fighting evil by moonlight." },
  { name: "Vegeta", genre: "Anime & Animations", description: "The proud prince of the Saiyan race, constantly competing with Goku to be the strongest." },
  { name: "Edward Elric", genre: "Anime & Animations", description: "A young alchemist prodigy who lost his arm and leg trying to resurrect his mother." },
  { name: "Gojo Satoru", genre: "Anime & Animations", description: "The strongest jujutsu sorcerer alive, known for his blindfold and overwhelming power." },
  { name: "Eren Yeager", genre: "Anime & Animations", description: "A boy who vowed to destroy all Titans after they broke through his city's walls." },

  // Spies & Action
  { name: "Jason Bourne", genre: "Spies & Action", description: "A highly trained, amnesiac CIA black ops agent on the run." },
  { name: "James Bond", genre: "Spies & Action", description: "The suave British MI6 agent known as 007, with a license to kill." },
  { name: "Ethan Hunt", genre: "Spies & Action", description: "An IMF agent who takes on impossible missions with daring stunts and disguises." },
  { name: "Black Widow", genre: "Spies & Action", description: "A former Russian spy turned Avenger, master of combat and espionage." },
  { name: "John Wick", genre: "Spies & Action", description: "A retired hitman drawn back into the underworld seeking vengeance for his dog." },
  { name: "Jack Ryan", genre: "Spies & Action", description: "A CIA analyst who keeps getting pulled into dangerous field operations." },
  { name: "Austin Powers", genre: "Spies & Action", description: "A groovy 1960s British spy thawed out in the 1990s to fight Dr. Evil." },
  { name: "Salt", genre: "Spies & Action", description: "A CIA officer accused of being a Russian sleeper agent who goes on the run." },
  { name: "Bryan Mills", genre: "Spies & Action", description: "A retired CIA operative with a very particular set of skills who will find you." },
  { name: "Sterling Archer", genre: "Spies & Action", description: "A narcissistic, hard-drinking spy who somehow manages to save the day." },
  { name: "Lorraine Broughton", genre: "Spies & Action", description: "An MI6 spy sent to Berlin during the Cold War, lethal in hand-to-hand combat." },
  { name: "Jack Bauer", genre: "Spies & Action", description: "A CTU agent who has 24 hours to stop terrorist attacks, no matter the cost." },
  { name: "Napoleon Solo", genre: "Spies & Action", description: "A suave CIA agent forced to team up with a KGB operative during the Cold War." },

  // Video Game Heroes
  {
    name: "Geralt of Rivia",
    genre: "Video Game Heroes",
    description: "A mutated monster hunter known as a Witcher, wielding two swords.",
    image: "https://images2.alphacoders.com/716/716335.jpg"
  },
  {
    name: "Master Chief",
    genre: "Video Game Heroes",
    description: "A supersoldier in green Spartan armor fighting aliens to save humanity.",
    image: "https://images4.alphacoders.com/106/1061919.jpg"
  },
  { name: "Mario", genre: "Video Game Heroes", description: "A mustached Italian plumber who rescues Princess Peach from Bowser." },
  { name: "Link", genre: "Video Game Heroes", description: "The Hero of Hyrule who wields the Master Sword to defeat Ganon." },
  { name: "Kratos", genre: "Video Game Heroes", description: "A Spartan warrior who killed Greek gods and now lives among Norse ones." },
  { name: "Lara Croft", genre: "Video Game Heroes", description: "A British archaeologist and adventurer who raids ancient tombs worldwide." },
  { name: "Cloud Strife", genre: "Video Game Heroes", description: "A mercenary with a massive Buster Sword fighting an evil corporation and a silver-haired villain." },
  { name: "Solid Snake", genre: "Video Game Heroes", description: "A legendary soldier and spy who infiltrates enemy bases to stop nuclear threats." },
  { name: "Aloy", genre: "Video Game Heroes", description: "A skilled hunter in a post-apocalyptic world overrun by robotic creatures." },
  { name: "Arthur Morgan", genre: "Video Game Heroes", description: "An outlaw in the dying days of the Wild West, torn between loyalty and morality." },
  { name: "Samus Aran", genre: "Video Game Heroes", description: "An intergalactic bounty hunter in a power suit who battles space pirates." },
  { name: "Pikachu", genre: "Video Game Heroes", description: "A small yellow electric mouse Pokémon and the most iconic creature in gaming." },
  { name: "Ellie", genre: "Video Game Heroes", description: "A tough survivor in a fungal zombie apocalypse, immune to the infection." },

  // General Celebrities
  { name: "Elon Musk", genre: "General Celebrities", description: "A billionaire tech mogul behind Tesla, SpaceX, and a social media platform." },
  { name: "Taylor Swift", genre: "General Celebrities", description: "A pop superstar known for her songwriting and record-breaking Eras Tour." },
  { name: "Dwayne Johnson", genre: "General Celebrities", description: "A former wrestler turned Hollywood's highest-paid actor, known as The Rock." },
  { name: "Beyoncé", genre: "General Celebrities", description: "A global music icon, performer, and cultural force known as Queen Bey." },
  { name: "Leonardo DiCaprio", genre: "General Celebrities", description: "An Oscar-winning actor famous for Titanic and his environmental activism." },
  { name: "Oprah Winfrey", genre: "General Celebrities", description: "A media mogul and talk show queen who became one of the most influential women." },
  { name: "Cristiano Ronaldo", genre: "General Celebrities", description: "One of the greatest soccer players ever, known for his athleticism and goal-scoring." },
  { name: "Kim Kardashian", genre: "General Celebrities", description: "A reality TV star turned business mogul and social media influencer." },
  { name: "Keanu Reeves", genre: "General Celebrities", description: "A beloved actor known for The Matrix and being the nicest person in Hollywood." },
  { name: "MrBeast", genre: "General Celebrities", description: "The biggest YouTuber in the world, famous for extravagant challenges and philanthropy." },
  { name: "Lionel Messi", genre: "General Celebrities", description: "Widely considered the greatest soccer player of all time, World Cup champion." },
  { name: "Rihanna", genre: "General Celebrities", description: "A Barbadian singer turned fashion and beauty billionaire with Fenty." },
  { name: "Gordon Ramsay", genre: "General Celebrities", description: "A fiery British chef famous for yelling at people on cooking shows." },
];

export function getCharactersByGenre(genre: Genre): Character[] {
  return characters.filter(c => c.genre === genre);
}

export function getRandomCharacter(genre: Genre, exclude?: string[], customPool?: Character[]): Character | null {
  const pool = (customPool && customPool.length > 0)
    ? customPool.filter(c => !exclude?.includes(c.name))
    : getCharactersByGenre(genre).filter(c => !exclude?.includes(c.name));

  if (pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}
