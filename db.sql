DROP DATABASE IF EXISTS Fam;
CREATE DATABASE Fam;
USE Fam;

SHOW DATABASES;

DROP TABLE IF EXISTS saying;

CREATE TABLE saying(
    id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    reg_date DATETIME NOT NULL,
    content VARCHAR(200) NOT NULL,
    auter VARCHAR(50) NOT NULL,
    view_count INT UNSIGNED NOT NULL DEFAULT 0,
    good_count INT UNSIGNED NOT NULL DEFAULT 0,
    bads_count INT UNSIGNED NOT NULL DEFAULT 0
);

INSERT INTO saying
SET reg_date = NOW(),
content = '삶이 있는 한 희망은 있다',
auter = '키케로';

INSERT INTO saying
SET reg_date = NOW(),
content = '산다는것 그것은 치열한 전투이다.',
auter = '로망로랑';

INSERT INTO saying
SET reg_date = NOW(),
content = '하루에 3시간을 걸으면 7년 후에 지구를 한바퀴 돌 수 있다.',
auter = '사무엘존슨';

INSERT INTO saying
SET reg_date = NOW(),
content = '언제나 현재에 집중할수 있다면 행복할것이다.',
auter = '파울로 코엘료';

INSERT INTO saying
SET reg_date = NOW(),
content = '진정으로 웃으려면 고통을 참아야하며 , 나아가 고통을 즐길 줄 알아야 해',
auter = '찰리 채플린';

INSERT INTO saying
SET reg_date = NOW(),
content = '직업에서 행복을 찾아라. 아니면 행복이 무엇인지 절대 모를 것이다',
auter = '엘버트 허버드';

INSERT INTO saying
SET reg_date = NOW(),
content = '신은 용기있는자를 결코 버리지 않는다',
auter = '켄러';

INSERT INTO saying
SET reg_date = NOW(),
content = '우리를 향해 열린 문을 보지 못하게 된다',
auter = '헬렌켈러';

INSERT INTO saying
SET reg_date = NOW(),
content = '피할수 없으면 즐겨라',
auter = '로버트 엘리엇';

INSERT INTO saying
SET reg_date = NOW(),
content = '단순하게 살아라. 현대인은 쓸데없는 절차와 일 때문에 얼마나 복잡한 삶을 살아가는가?',
auter = '이드리스 샤흐';

SELECT * FROM saying;