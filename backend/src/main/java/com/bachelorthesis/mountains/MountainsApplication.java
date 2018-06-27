package com.bachelorthesis.mountains;

import com.bachelorthesis.mountains.dto.NewMountainDto;
import com.bachelorthesis.mountains.service.MountainService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.nio.file.Files;
import java.nio.file.Paths;


@SpringBootApplication
public class MountainsApplication {



	public static void main(String[] args) {
		SpringApplication.run(MountainsApplication.class, args);


	}

	@Bean
	CommandLineRunner runner(MountainService mountainService) {
		return args -> {
			// read json and write to db
			byte[] jsonData = Files.readAllBytes(Paths.get("C:\\Users\\anca\\Desktop\\licenta\\mountains-socialmedia\\backend\\src\\main\\resources\\json\\mountains.geojson"));
			ObjectMapper objectMapper = new ObjectMapper();

			JsonNode rootNode = objectMapper.readTree(jsonData);
			for (JsonNode i : rootNode) {
			//	JsonNode name = i.path("firstName");
			//	NewUserDto createdUser = new NewUserDto( name.asText() ,"Lname", "mail",  "user", "pass");
			//	userService.create(createdUser);
				JsonNode props = i.path("properties");
				JsonNode denumire = props.path("DENUMIRE");
				NewMountainDto createdMountain = new NewMountainDto(denumire.asText());
 				mountainService.create(createdMountain);
				System.out.println(denumire + " saved");
			}




		};
	}


}
