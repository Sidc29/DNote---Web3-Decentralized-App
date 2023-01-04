import List "mo:base/List";
import Debug "mo:base/Debug";

actor NKeeper {

  // Creating a new data type Note to store the Note details
  public type Note = {
    title : Text;
    content : Text;
  };

  //Creating a List to contain all the Notes created
  // (basically an array of the note object)
  stable var notes : List.List<Note> = List.nil<Note>();

  //Getting the Note data from our frontend (data is passed as arguments)
  public func createNote(titleText : Text, contentText : Text) {

    let newNote : Note = {
      title = titleText;
      content = contentText;
    };

    //Pushing the data to notes List
    // Note: The item is pre-prended not appened which means it is pushed at the beginning of the list
    notes := List.push(newNote, notes);
    // Prints all the notes present in the notes List
    Debug.print(debug_show (notes));
  };

  //Retrieving data from the Notes List
  public query func readNotes() : async [Note] {
    return List.toArray(notes);
  };

  //Deleting a note from the backend
  public func removeNote(id : Nat) {
    // take drop append
    let listFront = List.take(notes, id);
    let listBack = List.drop(notes, id + 1);
    notes := List.append(listFront, listBack);
  };

};
