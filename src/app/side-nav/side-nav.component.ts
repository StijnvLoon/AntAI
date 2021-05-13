import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  data: Array<any>
  totalRecords: Number
  page: Number=1

@Input ()logs
  constructor() {
    this.data = [] as any;
    this.addDocmedium("Introduction (1/6)", "Welcome to the ant simulator software, you can browse through the different pages in this sidebar to read more about the project!", "Keywords", "Angular | TensorFlow | Artificial Intelligence | TypeScript | Simulation | A*", "", "", "ants_photo3.jpeg");
    this.addDocmedium("Introduction (2/6)", "This section provides an introduction to the application and it's purpose.", "Topic Introduction", "An individual ant is not a very intelligent creature, however, ants have a wide range of responses to stimuli that often comes from chemicals created inside the ants' body, which is how they communicate. Observing a group of ants might make it look like a group of intelligent creatures, or even a single entity (often referred to as hivemind). Could it be possible to simplify and simulate this hive intelligence and group behavior?", "Purpose", "The purpose of this software is to simulate an ant colony in a simplified way, where an ai can regulate the colony/ant distribution to maximize the lifetime of the colony.", "ants_photo2.jpeg");
    this.addDocmedium("Introduction (3/6)", "This section provides an introduction to the application and it's purpose.", "Constraints", "There are a number of different ants in an ant colony, for simplicity's sake, we stick to the following 3 ant types: Gatherer, Soldier and Caretaker. Each of these provides a specific advantage to the colony, the gatherer retrieves food, the soldier fights hostiles and the caretaker produces new ants. Each of these ants utilizes different resources.", "A Question", "Can an AI determine the optimal distrbution of ants for maximizing the lifetime of a colony of ants in variable conditions?", "");
    this.addDocmedium("Introduction (4/6)", "This section provides an introduction to the application and it's purpose.", "Constraints", "The colony's ant distribution is not the only thing that varies. A number of variables are introduced to diversify the result set. Examples are: food spawn location, terrain size, food cell yield, amount of enemies/hostiles, amount of starting ants, blockades, etc. ", "Visual Representation", "A map has been generated out of a grid of cells. An ant can move 1 cell every turn. Each cell has a cost and is traversable unless a 'blockade' entity is on it, which forces ants to traverse around the blocked cells. Ants are represented by black circles, enemies by red circles, and the colony by a yellow circle", "cell_types.png");
    this.addDocmedium("Introduction (5/6)", "This section provides an introduction to the application and it's purpose.", "Ant Behavior", "Gatherer ants return to the colony when they gathered a specific amount of food. They empty the food into storage in the colony, after which they will walk towards the nearest food source. Soldier ants will always hunt for enemies, and idle at the colony if there are no enemies. Caretaker ants move randomly. Ants move using the A* pathfinding algorithm", "Ant constraints", "Ants have a limited lifetime, in order for a colony to survive new ants need to be created by caretaker ants. If the colony is out of food ants will also cease to exist. Ants have limited speed due to the cost of moving over terrain. However, when an ant walked over a cell the cell will be temporarily cheaper to traverse for other ants. This makes it beneficial for ants to walk in lines/form columns.", "")
    this.addDocmedium("Introduction (6/6)", "This section provided a brief introduction to the topic. If this still makes little sense to you and sounds like mumbo-jumbo, feel free to read on to view a more in-depth explanation!", "", "","","Next up: Observing Ants", "ants_photo1.jpeg");
    this.addDocmedium("Observing Ants (1/1)", "Find a video of ants and name at least 5 behavioral traits. Here's one to get you started!", "Ants walk in a straight line", "Ants often walk in columns/lines, which has to do with them following scent (communication by pheromones). Even though our simulation is far too simple to be able to mimick the exact reasons why, we can reward the ants for walking in a column. Our solution: Traversing a cell another ant walked recently provides a pathfinding advantage, making the pathfinding cost analysis for the ant cheaper. This results in the ants having a  preference for walking behind other ants.", "Ants have different roles", "Ants fulfill different types of roles in real ant colonies. Although in an actual ant colony the role will vary based on a number of factors, we made it so that an ant is created as a specific type.", "column.png");
    this.addDocmedium("Component Overview", "This section provides an overview of different key components used for developing this application.", "App Component", "", "", "", "");
   }
   addDoc(img1, img2, title, p1, p2): void {
     this.data.push({title: title, p1: p1, p2: p2, img1 : img1, img2: img2 })
   }
   addDocsimple(title, p1, p2): void {
    this.data.push({title: title, p1: p1, p2: p2 })
  }
  addDocmedium(title, p1, title2, p2, title3, p3, img): void {
    this.data.push({title: title, p1: p1, p2: p2, title2 : title2, title3 : title3, p3 : p3, img})
  }


  getDocs() {
    this.totalRecords = this.data.length
  }

  ngOnInit(): void {
  }

}
