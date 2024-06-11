-- Tabela de instrutores
CREATE TABLE instructors (
    instructor_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);

-- Tabela de alunos
CREATE TABLE students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);

-- Tabela de cursos
CREATE TABLE courses (
    course_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    instructor_id INT,
    FOREIGN KEY (instructor_id) REFERENCES instructors (instructor_id) ON DELETE SET NULL
);

-- Tabela de matrículas
CREATE TABLE enrollments (
    enrollment_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    course_id INT,
    enrollment_date DATE NOT NULL,
    FOREIGN KEY (student_id) REFERENCES students (student_id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses (course_id) ON DELETE CASCADE,
    UNIQUE KEY unique_enrollment (student_id, course_id)
);