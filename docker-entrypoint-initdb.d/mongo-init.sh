set -e

mongo <<EOF
db = db.getSiblingDB('$MONGO_CONNECTION_DATABASE');

db.createUser({
  user: '$MONGO_CONNECTION_USERNAME',
  pwd:  '$MONGO_CONNECTION_PASSWORD',
  roles: [{
    role: 'readWrite',
    db: '$MONGO_CONNECTION_DATABASE'
  }]
})

db = db.getSiblingDB('mars_exploration');

db.createUser({
  user: '$MONGO_CONNECTION_USERNAME',
  pwd:  '$MONGO_CONNECTION_PASSWORD',
  roles: [{
    role: 'readWrite',
    db: 'mars_exploration'
  }]
})

db = db.getSiblingDB('test');

db.createUser({
  user: '$MONGO_CONNECTION_USERNAME',
  pwd:  '$MONGO_CONNECTION_PASSWORD',
  roles: [{
    role: 'readWrite',
    db: 'test'
  }]
})
EOF
