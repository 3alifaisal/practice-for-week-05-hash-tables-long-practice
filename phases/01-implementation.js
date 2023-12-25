class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable { // get O(1), set O(1), deleteKey O(1)

  constructor(numBuckets = 8) {
    this.count = 0;
    this.capacity = numBuckets;
    this.data = new Array(this.capacity).fill(null)
    
   

  }

  hash(key) {
    let hashValue = 0;

    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i);
    }

    return hashValue;
  }

  hashMod(key) {
    // Get index after hashing
    return this.hash(key) % this.capacity;
  }


  insert(key, value) {
    // Your code here
    let newKeyValuePair = new KeyValuePair(key, value);

    const index = this.hashMod(key);

    let curr = this.data[index];
    
    if(curr !== null){
    // handling the case when there exists a keyvalue pair with the samee index 
    while (curr !== null) {



      if (curr.key === key) {

        curr.value = value;
        return;
      }
      
      curr = curr.next;
    }

    // handling the case when the bucket is not empty (linked)
    
      //store the value of the current head
      const oldHead = this.data[index];
      // change the value of the current head to the new inserted node
      this.data[index] = newKeyValuePair;
      // change the next of the updated head to the old head
      this.data[index].next = oldHead;
    } else {
      this.data[index] = newKeyValuePair;
    }
    
    this.count++;
    if (this.count > this.capacity ) {
      this.resize();
    }
  
  }


  read(key) {
    const index = this.hashMod(key);
    let curr = this.data[index]
    if(curr === null) return undefined;
    while (curr !== null) {



      if (curr.key === key) {

        return curr.value;
      }

      curr = curr.next;
    }
    
    return undefined;
    
  }


  resize() {
    const oldData = this.data;

    // Reset hash table with the new size
    this.capacity *=  2;
    this.data = new Array(this.capacity).fill(null)
    
    // Reset count since we'll be re-adding elements
    this.count = 0;

    // Rehash and insert all existing key-value pairs
    oldData.forEach(bucket => {
     
      let curr = bucket;
      while (curr !== null) {
        const nextNode = curr.next;
        curr.next = null;
        this.insert(curr.key, curr.value);
        curr = nextNode;
        }
        
      
    });
  }


  delete(key) {
    const hash = this.hashMod(key);
    let curr = this.data[hash];
    let prev = null;

    while (curr !== null) {
      if (curr.key === key) {
        if (prev === null) {
          // If the node to delete is the head of the linked list
          this.data[hash] = curr.next;
        } else {
          prev.next = curr.next;
        }

        this.count--;
        return true; // Node deleted successfully
      }

      prev = curr;
      curr = curr.next;
    }

    return "Key not found"; // Node not found
  }
}


module.exports = HashTable;