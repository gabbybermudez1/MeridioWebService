-- Create table 
CREATE TABLE locations(
  locationName VARCHAR(30),  
  megabusID INT,
  kijijiID INT,
  viaID INT,
  goID VARCHAR(30),
  kijijiName VARCHAR(30)
);


-- Inserting into the database important values
INSERT INTO locations (locationName, megabusID, kijijiID, viaID, goID, kijijiName) VALUES
    ("Toronto", 145, 1700272 ,119, NULL , "gta-greater-toronto-area"),
    ("Montreal",280, 80002  ,NULL, NULL, "grand-montreal"),
    ("Kingston", 276, 1700181, NULL, NULL, "kingston-area" ),
    ("Waterloo", 422, 1700212, NULL, NULL,"kitchener-waterloo"),
    ("Whitby", 275, 1700275 ,NULL, NULL, "oshawa-durham-region")
;

