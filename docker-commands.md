docker run -p 27017:27017 -d \
		-e MONGO_INITDB_ROOT_USERNAME=admin \
		-e MONGO_INITDB_ROOT_PASSWORD=admin \
		--name mongodb \
		--net mongo-network \
		mongo

docker run -p 8081:8081 -d \
		-e ME_CONFIG_MONGODB_ADMINUSERNAME=admin \
		-e ME_CONFIG_MONGODB_ADMINPASSWORD=admin \
		--name mongo-express \
		--net mongo-network \
		-e ME_CONFIG_MONGODB_SERVER=mongodb \
		mongo-express