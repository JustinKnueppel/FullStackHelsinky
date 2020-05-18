const mongoose = require("mongoose")

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const connect = (password) => {
  const url = `mongodb+srv://phonebook:${password}@cluster0-0vieb.mongodb.net/test?retryWrites=true&w=majority`
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
}

const close = () => {
  mongoose.connection.close()
}

const displayPersons = (persons) => {
  console.log("phonebook");
  persons.forEach(person => {
    console.log(`${person.name} ${person.number}`)
  })
}

const getPersons = async () => {
  return await Person.find({});
}

const main = async (args) => {
  if (args.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
  }
  
  if (!(args.length === 3 || args.length === 5)) {
    console.log('Please provide password and optionally a new person to add')
    process.exit(1)
  }

  const password = args[2]
  connect(password);

  if (args.length === 3) {
    const persons = await getPersons();
    displayPersons(persons);
  }

  if (args.length === 5) {
    const name = args[3]
    const number = args[4]

    const person = new Person({
      name,
      number
    })

    await person.save();

    console.log(`${name} saved!`)
  }
  
  close()
}

main(process.argv)