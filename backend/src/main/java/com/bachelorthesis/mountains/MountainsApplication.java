package com.bachelorthesis.mountains;

import com.bachelorthesis.mountains.dto.NewMountainDto;
import com.bachelorthesis.mountains.model.Story;
import com.bachelorthesis.mountains.service.MountainService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;


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
				JsonNode props = i.path("properties");
				JsonNode denumire = props.path("DENUMIRE");
				JsonNode geom = i.path("geometry");
				JsonNode coords = geom.path("coordinates");

				List<ArrayList<Double>> listCoords = new ArrayList<ArrayList<Double>>();
				if (coords.isArray()) {
					for (JsonNode objNode1 : coords) {
					//	System.out.println(objNode1);
						for (JsonNode objNode2 : objNode1) {
						//	System.out.println(objNode2);
							for (JsonNode objNode3 : objNode2) {
								//System.out.println(objNode3);
								ArrayList<Double> coordinates = new ArrayList<Double>();
								coordinates.add(objNode3.get(0).asDouble());
								coordinates.add(objNode3.get(1).asDouble());
								listCoords.add(coordinates);
							}
						}
					}
				}
				List<Story> emptyStoryList = new ArrayList<Story>();
				NewMountainDto createdMountain = new NewMountainDto(denumire.asText(), listCoords, emptyStoryList);
				mountainService.create(createdMountain);

			}




		};
	}


}
