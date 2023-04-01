if not exists (select * from sysobjects where name='JewelryType')
    create table JewelryType (Id int identity (1,1), Name nvarchar (100), IsUnique bit, PricePerG Float (5), PRIMARY KEY (Id))

if not exists (select * from sysobjects where name='Jewelry')
    create table Jewelry (Id int identity (1,1),ShopId nvarchar(100),Weight Float (5), TypeId int,Price Float (5), Quantity int, DateAdded DATETIME, PhotoFilename nvarchar(500), IsUnique bit, IsDeleted bit, PRIMARY KEY (Id),
    FOREIGN KEY (TypeId) REFERENCES JewelryType(Id))

if not exists (select * from sysobjects where name='Sales')
    create table Sales (Id int identity (1,1),JewelryId int,PriceAtSale float(10), DateOfTransaction DATETIME, PRIMARY KEY (Id),
    FOREIGN KEY (JewelryId) REFERENCES Jewelry(Id))

if not exists (select * from sysobjects where name='Maintenance')
    create table Maintenance (Id int identity (1,1),JewelryId int, DateOfTransaction DATETIME, PRIMARY KEY (Id),
    FOREIGN KEY (JewelryId) REFERENCES Jewelry(Id))
